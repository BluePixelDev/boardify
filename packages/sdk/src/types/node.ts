import { ImportEvent } from "./importer";

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

export interface NodeService {
  addNode<T = unknown>(node: NodeData<T>): void;
  removeNode(id: string): void;
  updateNode<T = unknown>(id: string, patch: Partial<NodeData<T>>): void;
  createNodeFromImportEvent<T>(
    event: ImportEvent,
    size: NodeSize,
    node: Omit<NodeData<T>, "id" | "position" | "layerId" | "size" | "zIndex"> &
      Partial<Pick<NodeData<T>, "aspectLocked">>
  ): NodeData<T>;
}
