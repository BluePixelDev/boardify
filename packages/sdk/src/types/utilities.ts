import { ImportEvent } from "./importer";
import { NodeData, NodeSize } from "./node";

export type CreateNodeFromImportEventFn = <T>(
  importEvent: ImportEvent,
  size: NodeSize,
  partialNode: Omit<
    NodeData<T>,
    "id" | "position" | "layerId" | "size" | "zIndex"
  > &
    Partial<Pick<NodeData<T>, "aspectLocked">>
) => NodeData<T>;

export type CreateBaseNodeFn = <T>(
  overrides: Omit<NodeData<T>, "id" | "zIndex" | "aspectLocked"> &
    Partial<Pick<NodeData<T>, "aspectLocked" | "zIndex">>
) => NodeData<T>;

export type GetFileFormatFn = (
  buffer: ArrayBuffer
) => Promise<string | undefined>;
