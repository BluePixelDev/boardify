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

export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeSize {
  width: number;
  height: number;
}

/**
 * Represents an individual node placed on the canvas.
 *
 * @typeParam T - Type of the custom data attached to the node.
 */
export interface NodeData<T = unknown> {
  id: string;
  type: string;
  layerId: string;
  zIndex: number;

  position: NodePosition;
  size: NodeSize;
  aspectLocked?: boolean;

  data: T;
}

export type UseNodeResult<T> = {
  node: NodeData<T> | undefined;
  size: NodeSize | undefined;
  aspectRatio: number | undefined;
  isSelected: boolean;
  update: (changes: Partial<NodeData<unknown>>) => void;
  moveSelected: (newPos: NodePosition) => void;
  move: (newPos: NodePosition) => void;
  resize: (newSize: NodeSize) => void;
};
