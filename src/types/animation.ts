/**
 * @brief Represents a CSS animation.
 * @description A mapping of keyframes to their corresponding CSS styles.
 * @example
 * const animation: CSSAnimation = {
 *   '0%': { transform: 'translateY(0)' },
 *   '100%': { transform: 'translateY(-100%)' }
 * };
 */
export interface Animation {
  [key: `${number}%`]: Partial<CSSStyleDeclaration>;
}

/**
 * @brief Represents the options for animating an element.
 * @description This interface defines the various options that can be used to customize the animation of an element.
 */
export interface AnimateOptions {
  duration: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  delay?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  iterationCount: number | 'infinite';
}
