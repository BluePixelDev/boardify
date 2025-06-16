/**
 * Represents a visual layer used to organize nodes on the canvas.
 */
export interface Layer {
  /**
   * Unique identifier for the layer.
   */
  id: string;

  /**
   * Human-readable name of the layer.
   */
  name: string;

  /**
   * CSS color or hex code used to visually represent the layer.
   */
  color: string;

  /**
   * Icon name or path associated with the layer.
   */
  icon: string;
}
