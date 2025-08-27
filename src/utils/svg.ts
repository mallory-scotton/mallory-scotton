/** Dependencies */
import fs from 'fs';
import path from 'path';
import { SVGObject, SVGType, TextOptions, Boundary, Animation, AnimateOptions } from '../types';
import { Inter } from './fonts';
import { WATERMARK } from './watermark';
import { imageToDataURL } from './images';

/**
 * @brief
 * @description
 */
export class SVG {
  /** Member class */
  private _self: SVGObject;
  private _animations: Map<Animation, string>;

  /**
   * @brief Constructor for the SVG class
   * @description Initializes the SVG dimensions
   * @param width - The width of the SVG
   * @param height - The height of the SVG
   * @param x - The x coordinate of the SVG viewbox
   * @param y - The y coordinate of the SVG viewbox
   */
  constructor(width: number, height: number, x: number = 0, y: number = 0) {
    this._self = {
      type: 'svg',
      xmlns: 'http://www.w3.org/2000/svg',
      width,
      height,
      viewBox: `${x} ${y} ${width} ${height}`,
      fill: 'none',
      children: []
    };
    this._animations = new Map<Animation, string>();
  }

  /**
   * @brief Set the dimensions of the SVG
   * @description This method sets the width, height, and viewBox of the SVG.
   * @param width - The new width of the SVG
   * @param height - The new height of the SVG
   * @param x - The x coordinate of the SVG viewbox
   * @param y - The y coordinate of the SVG viewbox
   */
  public setDimensions(width: number, height: number, x: number = 0, y: number = 0): void {
    if (this._self.type === 'svg') {
      this._self.width = width;
      this._self.height = height;
      this._self.viewBox = `${x} ${y} ${width} ${height}`;
    }
  }

  /**
   * @brief Generate the SVG markup
   * @description This method generates the SVG markup for the current SVG object.
   * @returns The SVG markup as a string.
   */
  private _generate(): string {
    // Helper function to convert SVGObject to HTML string
    function svgObjectToHtml(node: SVGObject, indent = 0): string {
      const { type, children, style, ...attrs } = node as SVGObject;
      const indentStr = '  '.repeat(indent); // 2 spaces

      // Convert CSSStyleDeclaration to inline style string
      let styleString = '';
      if (style) {
        const styleEntries: string[] = [];
        for (const [key, value] of Object.entries(style)) {
          if (value) {
            styleEntries.push(`${key}: ${value}`);
          }
        }
        if (styleEntries.length > 0) {
          styleString = ` style="${styleEntries.join('; ')}"`;
        }
      }

      // Convert attributes into string (skip undefined/null/children/style)
      const attrString = Object.entries(attrs)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => ` ${k.charAt(0).toLowerCase() + k.slice(1)}="${v}"`)
        .join('');

      // Process children recursively with indentation
      const childrenString = (children ?? []).map((child: SVGObject) => svgObjectToHtml(child, indent + 1)).join('\n');

      // Self-closing tags
      const selfClosing: SVGType[] = [
        'rect',
        'path',
        'circle',
        'line',
        'polyline',
        'polygon',
        'stop',
        'feFlood',
        'feColorMatrix',
        'feOffset',
        'feGaussianBlur',
        'feComposite',
        'feColorMatrix',
        'feBlend',
        'feBlend',
        'use',
        'image'
      ];

      // Self-closing tags
      if (selfClosing.includes(type) && !childrenString) {
        return `${indentStr}<${type}${attrString}${styleString}/>`;
      }

      // Style element
      if (node.type === 'style') {
        const content = node.content
          .split('\n')
          .map((line) => indentStr + line)
          .join('\n'); // 2 extra spaces
        return `${indentStr}<${type}>\n${content}\n${indentStr}</${type}>`;
      }

      // Regular element
      if (!childrenString) {
        return `${indentStr}<${type}${attrString}${styleString}></${type}>`;
      }

      // Closing tags
      return `${indentStr}<${type}${attrString}${styleString}>\n${childrenString}\n${indentStr}</${type}>`;
    }

    // Generate the SVG markup
    return svgObjectToHtml(this._self);
  }

  /**
   * @brief Generate a unique ID for the SVG element
   * @description This method generates a unique ID for the current SVG element.
   * @param prefix - The prefix to use for the generated ID.
   * @returns The generated unique ID as a string.
   */
  private _generateID(prefix: string): string {
    return `${prefix}${Math.random().toString(36).slice(2, 18)}`;
  }

  /**
   * @brief Add a child element to the SVG
   * @description This method adds a child SVG element to the current SVG object.
   * @param child - The child SVG element to add.
   * @returns The added child SVG element.
   */
  public addChild(child: SVGObject): SVGObject {
    // Initialize children array if it doesn't exist
    if (!this._self.children) {
      this._self.children = [];
    }

    // Helper function to set a unique ID for each element
    const that = this;
    function setID(element: SVGObject): SVGObject {
      element.id = that._generateID('msvg-');
      if (element.children) {
        for (let i = 0; i < element.children.length; i++) {
          element.children[i] = setID(element.children[i]);
        }
      }
      return element;
    }

    // Add the child element to the children array
    this._self.children?.push(setID(child));

    // Return the added child element
    return child;
  }

  /**
   * @brief Add a filter to the SVG
   * @description This method adds a filter to the current SVG object.
   * @param filter - The filter SVG element to add.
   * @returns The added filter SVG element.
   */
  public addFilter(filter: SVGObject): SVGObject {
    // Generate a unique ID for the filter
    const id = this._generateID('filter-');

    // Initialize filters array if it doesn't exist
    if (!this._self.children) {
      this._self.children = [];
    }

    // Get the defs element
    let defs: SVGObject | undefined = this._self.children?.find((c) => c.type === 'defs');
    if (!defs) {
      defs = { type: 'defs', children: [] } as SVGObject;
      this._self.children?.push(defs);
    }

    // Ensure children exists
    if (!defs.children) {
      defs.children = [];
    }

    // Set the filter ID
    filter.id = id;

    // Add the filter element to the defs
    defs.children?.push(filter);

    // Return the added filter element
    return filter;
  }

  /**
   * @brief Add a pattern to the SVG
   * @description This method adds a pattern to the current SVG object.
   * @param pattern - The pattern SVG element to add.
   * @returns The added pattern SVG element.
   */
  public addPattern(pattern: SVGObject): SVGObject {
    // Generate a unique ID for the pattern
    const id = this._generateID('pattern-');

    // Initialize patterns array if it doesn't exist
    if (!this._self.children) {
      this._self.children = [];
    }

    // Get the defs element
    let defs: SVGObject | undefined = this._self.children?.find((c) => c.type === 'defs');
    if (!defs) {
      defs = { type: 'defs', children: [] } as SVGObject;
      this._self.children?.push(defs);
    }

    // Ensure children exists
    if (!defs.children) {
      defs.children = [];
    }

    // Set the pattern ID
    pattern.id = id;

    // Add the pattern element to the defs
    defs.children?.push(pattern);

    // Return the added pattern element
    return pattern;
  }

  /**
   * @brief Add an image to the SVG
   * @description This method adds an image element to the current SVG object.
   * @param src - The source URL of the image.
   * @param width - The width of the image.
   * @param height - The height of the image.
   * @returns The added image SVG element.
   */
  public addImage(src: string, width?: number, height?: number): SVGObject {
    // Set the xmlns:xlink for the root element
    if (this._self.type === 'svg') {
      this._self['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
    }

    // Get the Data URL
    const data = imageToDataURL(src.replace('file://', ''));

    // Create the image element
    const image: SVGObject = {
      'type': 'image',
      'id': this._generateID('image-'),
      'width': width || data.dimensions.width,
      'height': height || data.dimensions.height,
      'preserveAspectRatio': 'none',
      'xlink:href': data.data
    };

    // Initialize filters array if it doesn't exist
    if (!this._self.children) {
      this._self.children = [];
    }

    // Get the defs element
    let defs: SVGObject | undefined = this._self.children?.find((c) => c.type === 'defs');
    if (!defs) {
      defs = { type: 'defs', children: [] } as SVGObject;
      this._self.children?.push(defs);
    }

    // Add the image element to the defs
    defs.children?.push(image);

    // Return the added image element
    return image;
  }

  /**
   * @brief Find an element by its ID
   * @description This method searches for an SVG element by its unique ID.
   * @param id - The ID of the element to find.
   * @returns The found SVG element or null if not found.
   */
  private _findElementById(id: string, node: SVGObject): SVGObject | null {
    // Check if the current node matches the ID
    if (node.id === id) {
      return node;
    }
    // Check if the current node has children
    if (!node.children) {
      return null;
    }
    // Check each child recursively
    for (const child of node.children) {
      const found = this._findElementById(id, child);
      // Check if the child was found
      if (found) {
        return found;
      }
    }
    // Not found
    return null;
  }

  /**
   * @brief Add an animation to the SVG
   * @description This method adds an animation to the current SVG object.
   * @param id - The id of the element to animated.
   * @param animation - The animation object to add.
   */
  public addAnimation(id: string, animation: Animation, options: AnimateOptions): void {
    // Initialize animation ID
    let animationID = '';

    // Check if the animation already exists
    if (this._animations.has(animation)) {
      // Animation already exists
      animationID = this._animations.get(animation)!;
    } else {
      // Create unique animation name
      animationID = this._generateID('anim-');

      // Build keyframes CSS
      const keyframes: string[] = [];
      for (const [percent, styles] of Object.entries(animation)) {
        const rules: string[] = [];
        for (const [prop, value] of Object.entries(styles)) {
          if (value) {
            const cssProp = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
            rules.push(`      ${cssProp}: ${value};`); // 6 spaces
          }
        }
        keyframes.push(`    ${percent} {\n${rules.join('\n')}\n    }`);
      }

      // Create the keyframes CSS
      const cssKeyframes = `  @keyframes ${animationID} {\n` + keyframes.join('\n') + `\n  }`;

      // Ensure children exists
      if (!this._self.children) {
        this._self.children = [];
      }

      // Ensure <style> exists
      let styleNode: SVGObject | undefined = this._self.children?.find((c) => c.type === 'style');
      if (!styleNode) {
        styleNode = { type: 'style', content: '' } as SVGObject;
        this._self.children?.push(styleNode);
      }

      // Append the new animation
      if (styleNode.type === 'style') {
        styleNode.content = (styleNode.content || '') + `\n${cssKeyframes}`;
      }

      // Save animation reference
      this._animations.set(animation, animationID);
    }

    // Apply the animation to the element with given id
    const element = this._findElementById(id, this._self);
    if (element) {
      const animStr = `${animationID} ${options.duration}ms ${options.easing || 'linear'} ${options.delay || 0}ms ${options.iterationCount} ${options.direction || 'normal'}`;
      if (!element.style) {
        element.style = {};
      }
      element.style.animation = animStr;
    }
  }

  /**
   * @brief Add text to the SVG
   * @description This method adds text to the current SVG object.
   * @param text - The text content to add.
   * @param options - The options for the text, including position and styling.
   * @returns The bounding box of the added text.
   */
  public addText(text: string, options: TextOptions): [Boundary, SVGObject] {
    const { x = 0, y = 0, lineHeight, fontSize = 16, fontWeight = 'regular', letterSpacing = 0 } = options;

    // Get the font for the text
    const font = Inter[fontWeight];

    // Create a path for the text
    const path = font.getPath(text, 0, 0, fontSize, {
      letterSpacing: letterSpacing / 10
    });

    // Get the bounding box of the text path
    const bbox = path.getBoundingBox();

    // Add the text path to the SVG
    const element = this.addChild({
      type: 'path',
      style: {
        transform: `translate(${x}px, ${y + (lineHeight - fontSize) / 2 + fontSize - 2}px)`
      },
      d: path.toPathData(2),
      fill: options.color || undefined,
      opacity: options.opacity ?? 1
    });

    // Create a boundary object for the text
    return [
      {
        width: bbox.x2 - bbox.x1,
        height: options.lineHeight || bbox.y2 - bbox.y1,
        x: bbox.x1,
        y: bbox.y1
      },
      element
    ];
  }

  /**
   * @brief Save the SVG to a file
   * @description This method saves the generated SVG to a specified file path.
   * @param filePath - The path to the file where the SVG will be saved.
   */
  public save(filePath: string): void {
    // Get the directory name from the file path
    const dirname = path.dirname(filePath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    // Generate the SVG element
    const svg = `${WATERMARK}\n${this._generate()}\n`;

    // Write the SVG element to the specified file
    fs.writeFileSync(filePath, svg);
  }
}
