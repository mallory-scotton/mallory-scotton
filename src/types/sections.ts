/**
 * @brief Image options for sections
 * @description Options for configuring images within sections
 */
export interface ImageOptions {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  url?: string;
  align?: 'left' | 'center' | 'right';
  indent?: number;
}
