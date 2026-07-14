/** Dependencies */
import { SVG } from '../utils';
import { AboutMeSlide, PreferredTheme } from '../types';

/**
 * @brief Generates an SVG representation of an about section.
 * @description This function takes a ProfileConfig object and generates an SVG image
 * representing the about section, including user details and other relevant information.
 * @param slide - The about me slide configuration object containing user details.
 * @param index - The index of the about slide.
 * @returns An SVG representation of the about section.
 */
export function aboutslide2svg(slide: AboutMeSlide, index: number, theme: PreferredTheme): SVG {
  // Create SVG
  const svg = new SVG(401, 1000, 65, 0);

  // Create the palette
  const isDarkTheme = theme === 'dark';
  const palette = {
    primary: isDarkTheme ? 'white' : 'black',
    secondary: isDarkTheme ? '#F2F2F2' : '#121212'
  };

  // Add the main image
  const image = svg.addImage(slide.image, 1080, 1927);

  // Check if the slide index is even or odd to determine text alignment
  const isLeftAligned = index % 2 === 1;

  // Prepare a variable to store total height of text for vertical centering
  let totalTextHeight = 0;

  const addAboutText = () => {
    // Add title text
    const [titleBound, titleLines] = svg.addMultiLineText(slide.title, {
      fontSize: 14.59,
      lineHeight: 21.9,
      fontWeight: 'medium',
      x: 91,
      y: isLeftAligned ? 650 : 45,
      letterSpacing: 0.32,
      opacity: 0.9,
      color: palette.secondary,
      maxWidth: 350,
      insertSpace: false
    });

    // Update total text height with title height
    totalTextHeight += titleBound.height;

    // Add description text if it exists
    if (slide.description) {
      const [descriptionBound, descriptionLines] = svg.addMultiLineText(slide.description, {
        fontSize: 12.88,
        lineHeight: 21.9,
        fontWeight: 'medium',
        x: 91,
        y: (isLeftAligned ? 650 : 45) + titleBound.height + 22,
        letterSpacing: 0.32,
        opacity: 0.6,
        color: palette.secondary,
        maxWidth: 350,
        insertSpace: false,
        supportEmptyLine: true
      });

      // Add description height and spacing
      totalTextHeight += descriptionBound.height + 22;
    }
  };

  const addAboutImage = () => {
    // Compute total transform
    const imageTransformY = isLeftAligned ? -49 : totalTextHeight + (slide.description ? 40 : 60);

    // Top Light
    const topLightPaint = svg.addToDefs('paint', {
      type: 'linearGradient',
      x1: 0,
      y1: 0.405172,
      x2: 400.31,
      y2: 0.405172,
      gradientUnits: 'userSpaceOnUse',
      children: [
        { 'type': 'stop', 'offset': 0.05, 'stop-opacity': 0 },
        { 'type': 'stop', 'offset': 0.35, 'stop-opacity': 0.8, 'stop-color': palette.secondary },
        { 'type': 'stop', 'offset': 0.5, 'stop-color': palette.secondary },
        { 'type': 'stop', 'offset': 0.65, 'stop-opacity': 0.8, 'stop-color': palette.secondary },
        { 'type': 'stop', 'offset': 0.95, 'stop-opacity': 0 }
      ]
    });
    svg.addChild({
      type: 'rect',
      width: 400.31,
      height: 0.810345,
      transform: `translate(65 ${49 + imageTransformY})`,
      fill: `url(#${topLightPaint.id!})`
    });

    // Add image pattern
    const imagePattern = svg.addPattern({
      type: 'pattern',
      width: 1,
      height: 1,
      patternContentUnits: 'objectBoundingBox',
      children: [
        {
          'type': 'use',
          'xlink:href': `#${image.id!}`,
          'transform': 'matrix(0.000925926 0 0 0.000617284 0 -0.0947531)'
        }
      ]
    });

    // Add clip paths
    const outerClipPath = svg.addClipPath({
      type: 'path',
      d: 'M65 68.4483C65 57.7073 73.7073 49 84.4483 49H445.862C456.603 49 465.31 57.7073 465.31 68.4483V622.724C465.31 633.465 456.603 642.172 445.862 642.172H84.4483C73.7073 642.172 65 633.465 65 622.724V68.4483Z',
      fill: palette.primary
    });
    const innerClipPath = svg.addClipPath({
      type: 'path',
      d: 'M71.4824 68.4484C71.4824 61.2878 77.2873 55.4829 84.4479 55.4829H445.862C453.022 55.4829 458.827 61.2878 458.827 68.4484V622.724C458.827 629.885 453.022 635.69 445.862 635.69H84.4479C77.2873 635.69 71.4824 629.885 71.4824 622.724V68.4484Z',
      fill: palette.primary
    });

    // Paints
    const radialGradient = svg.addToDefs('paint', {
      type: 'radialGradient',
      cx: 0,
      cy: 0,
      r: 1,
      gradientUnits: 'userSpaceOnUse',
      gradientTransform: 'translate(265.155 345.586) rotate(55.986) scale(357.806 331.818)',
      children: [
        { 'type': 'stop', 'stop-color': palette.secondary, 'stop-opacity': 0.2 },
        { 'type': 'stop', 'offset': 1, 'stop-opacity': 0 }
      ]
    });
    const linearGradient = svg.addToDefs('paint', {
      type: 'linearGradient',
      x1: 0,
      y1: 0.810345,
      x2: 387.345,
      y2: 0.810345,
      gradientUnits: 'userSpaceOnUse',
      children: [
        { 'type': 'stop', 'offset': 0.1, 'stop-opacity': 0 },
        { 'type': 'stop', 'offset': 0.5, 'stop-color': palette.primary },
        { 'type': 'stop', 'offset': 0.9, 'stop-opacity': 0 }
      ]
    });

    // Filters
    const dropShadowFilter = svg.addFilter({
      'type': 'filter',
      'x': 0.172409,
      'y': 0.379307,
      'width': 529.966,
      'height': 730.931,
      'filterUnits': 'userSpaceOnUse',
      'color-interpolation-filters': 'sRGB',
      // prettier-ignore
      'children': [
      { type: 'feFlood', 'flood-opacity': "0", result: "BackgroundImageFix" },
      { type: 'feColorMatrix', in: "SourceAlpha", Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" },
      { type: 'feOffset', },
      { type: 'feGaussianBlur', stdDeviation: "24.3103" },
      { type: 'feComposite', in2: "hardAlpha", operator: "out" },
      { type: 'feColorMatrix', Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" },
      { type: 'feBlend', mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_2057_135" },
      { type: 'feColorMatrix', in: "SourceAlpha", Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" },
      { type: 'feOffset', dy: "24.3103" },
      { type: 'feGaussianBlur', stdDeviation: "32.4138" },
      { type: 'feComposite', in2: "hardAlpha", operator: "out" },
      { type: 'feColorMatrix', Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" },
      { type: 'feBlend', mode: "normal", in2: "effect1_dropShadow_2057_135", result: "effect2_dropShadow_2057_135" },
      { type: 'feBlend', mode: "normal", in: "SourceGraphic", in2: "effect2_dropShadow_2057_135", result: "shape" },
      { type: 'feColorMatrix', in: "SourceAlpha", Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" },
      { type: 'feOffset' },
      { type: 'feGaussianBlur', stdDeviation: "3.24138" },
      { type: 'feComposite', in2: "hardAlpha", operator: "arithmetic", k2: "-1", k3: "1" },
      { type: 'feColorMatrix', Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" },
      { type: 'feBlend', mode: "normal", in2: "shape", result: "effect3_innerShadow_2057_135" }
    ]
    });
    const innerShadowFilter = svg.addFilter({
      'type': 'filter',
      'x': 61.7583,
      'y': 45.7588,
      'width': 406.794,
      'height': 599.655,
      'filterUnits': 'userSpaceOnUse',
      'color-interpolation-filters': 'sRGB',
      // prettier-ignore
      'children': [
      { type: 'feFlood', 'flood-opacity': "0", result: "BackgroundImageFix" },
      { type: 'feColorMatrix', in: "SourceAlpha", Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" },
      { type: 'feOffset' },
      { type: 'feGaussianBlur', stdDeviation: "4.86207" },
      { type: 'feComposite', in2: "hardAlpha", operator: "out" },
      { type: 'feColorMatrix', Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" },
      { type: 'feBlend', mode: "normal", in2: "BackgroundImageFix", result: "effect1_dropShadow_2057_135" },
      { type: 'feBlend', mode: "normal", in: "SourceGraphic", in2: "effect1_dropShadow_2057_135", result: "shape" },
      { type: 'feColorMatrix', in: "SourceAlpha", Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" },
      { type: 'feOffset' },
      { type: 'feGaussianBlur', stdDeviation: "4.05172" },
      { type: 'feComposite', in2: "hardAlpha", operator: "arithmetic", k2: "-1", k3: "1" },
      { type: 'feColorMatrix', Type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" },
      { type: 'feBlend', mode: "normal", in2: "shape", result: "effect2_innerShadow_2057_135" }
    ]
    });

    // Add image group
    const imageGroup = svg.addChild({
      type: 'g',
      filter: `url(#${dropShadowFilter.id!})`,
      transform: `translate(0, ${imageTransformY})`,
      children: [
        {
          'type': 'g',
          'clip-path': `url(#${outerClipPath.id!})`,
          'children': [
            {
              'type': 'path',
              'd': 'M65 68.4483C65 57.7073 73.7073 49 84.4483 49H445.862C456.603 49 465.31 57.7073 465.31 68.4483V622.724C465.31 633.465 456.603 642.172 445.862 642.172H84.4483C73.7073 642.172 65 633.465 65 622.724V68.4483Z',
              'fill': `url(#${radialGradient.id!})`,
              'shape-rendering': 'crispEdges',
              'fill-opacity': 0.01
            },
            {
              type: 'rect',
              width: 387.345,
              height: 1.62069,
              transform: 'translate(71.4824 55.4829)',
              fill: `url(#${linearGradient.id!})`
            },
            {
              type: 'g',
              filter: `url(#${innerShadowFilter.id!})`,
              children: [
                {
                  'type': 'g',
                  'clip-path': `url(#${innerClipPath.id!})`,
                  'children': [
                    {
                      'type': 'path',
                      'd': 'M71.4824 68.4484C71.4824 61.2878 77.2873 55.4829 84.4479 55.4829H445.862C453.022 55.4829 458.827 61.2878 458.827 68.4484V622.724C458.827 629.885 453.022 635.69 445.862 635.69H84.4479C77.2873 635.69 71.4824 629.885 71.4824 622.724V68.4484Z',
                      'fill': palette.primary,
                      'fill-opacity': 0.01,
                      'shape-rendering': 'crispEdges'
                    },
                    {
                      'type': 'rect',
                      'width': 385.724,
                      'height': 578.586,
                      'transform': 'translate(72.293 56.2935)',
                      'fill': '#101010',
                      'fill-opacity': 0.7
                    },
                    {
                      type: 'rect',
                      width: 385.724,
                      height: 578.586,
                      transform: 'translate(72.293 56.2935)',
                      fill: `url(#${imagePattern.id!})`
                    }
                  ]
                },
                {
                  'type': 'path',
                  'd': 'M84.4482 55.8882H445.861C452.798 55.8882 458.422 61.5118 458.422 68.4487V622.724C458.422 629.661 452.798 635.285 445.861 635.285H84.4482C77.5114 635.285 71.8877 629.661 71.8877 622.724V68.4487C71.8877 61.5118 77.5114 55.8882 84.4482 55.8882Z',
                  'stroke': palette.secondary,
                  'stroke-opacity': 0.3,
                  'stroke-width': 0.810345,
                  'shape-rendering': 'crispEdges'
                }
              ]
            }
          ]
        }
      ]
    });
  };

  // Add elements in the correct order based on alignment
  if (isLeftAligned) {
    addAboutImage();
    addAboutText();
  } else {
    addAboutText();
    addAboutImage();
  }

  // Return the SVG element
  return svg;
}
