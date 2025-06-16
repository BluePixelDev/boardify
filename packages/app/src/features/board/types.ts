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

/**
 * Defines a 2D position on the canvas.
 */
export interface NodePosition {
  /**
   * Horizontal (X) coordinate on the canvas.
   */
  x: number;

  /**
   * Vertical (Y) coordinate on the canvas.
   */
  y: number;
}

/**
 * Represents the size of a node on the canvas.
 */
export interface NodeSize {
  /**
   * Width of the node in pixels or canvas units.
   */
  width: number;

  /**
   * Height of the node in pixels or canvas units.
   */
  height: number;
}

/**
 * Represents an individual node placed on the canvas.
 *
 * @typeParam T - Type of the custom data attached to the node.
 */
export interface NodeData<T = unknown> {
  /**
   * Unique identifier for the node.
   */
  id: string;

  /**
   * Type of the node, used to determine behavior and rendering.
   */
  type: string;

  /**
   * Identifier of the layer this node belongs to.
   */
  layerId: string;

  /**
   * Drawing order index; higher values render on top.
   */
  zIndex: number;

  /**
   * Position of the node on the canvas.
   */
  position: NodePosition;

  /**
   * Size of the node (width and height).
   */
  size: NodeSize;

  /**
   * Whether the node's aspect ratio should be locked during resizing.
   */
  aspectLocked?: boolean;

  /**
   * Arbitrary user-defined data attached to this node.
   */
  data: T;
}
