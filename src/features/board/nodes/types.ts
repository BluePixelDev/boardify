export interface NodePosition {
  /** X coordinate on the canvas */
  x: number;

  /** Y coordinate on the canvas */
  y: number;
}

export interface NodeSize {
  /** Node width in pixels or units */
  width: number;

  /** Node height in pixels or units */
  height: number;
}

export interface NodeData<T = unknown> {
  id: string;

  /** Node type identifier, used to distinguish behavior/rendering */
  type: string;

  /** ID of the layer this node belongs to */
  layerId: string;

  position: NodePosition;
  size: NodeSize;

  /** Custom user-defined data attached to this node */
  data: T;
}
