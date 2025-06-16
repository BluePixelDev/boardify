import { NodeData, NodeSize } from "@/features/board";
import { selectCurrentLayer } from "@/features/board/store/layersSelectors";
import { RootState } from "@/redux";
import { ImportEvent } from "@boardify/sdk";
import { v4 as uuidv4 } from "uuid";

/**
 * Constructs a full node object with default values and a unique ID.
 *
 * @typeParam T - The node's data type.
 * @param overrides - Fields to override the defaults.
 * @returns A new fully-formed `NodeData<T>` object.
 */
export function createBaseNode<T>(
  overrides: Omit<NodeData<T>, "id" | "zIndex" | "aspectLocked"> &
    Partial<Pick<NodeData<T>, "aspectLocked" | "zIndex">>
): NodeData<T> {
  return {
    id: uuidv4(),
    zIndex: overrides.zIndex ?? 0,
    aspectLocked: overrides.aspectLocked ?? false,
    ...overrides,
  };
}

/**
 * Creates a new node from an import event by projecting screen coordinates into graph space.
 *
 * @typeParam T - The type of node data.
 * @param importEvent - The import trigger event.
 * @param size - Desired node size.
 * @param partialNode - Partial node fields (excluding core positioning).
 * @returns A fully formed `NodeData<T>` object.
 */
export function createNodeFromImportEvent<T>(
  importEvent: ImportEvent,
  size: NodeSize,
  partialNode: Omit<
    NodeData<T>,
    "id" | "position" | "layerId" | "size" | "zIndex"
  > &
    Partial<Pick<NodeData<T>, "aspectLocked">>
): NodeData<T> {
  const state = importEvent.getState() as RootState;
  const { transform } = state.board.view;
  const { x, y } = importEvent.position;

  const [scaleX, , , scaleY, translateX, translateY] = transform;
  const graphX = (x - translateX) / scaleX - size.width / 2;
  const graphY = (y - translateY) / scaleY - size.height / 2;

  return createBaseNode({
    ...partialNode,
    position: { x: graphX, y: graphY },
    size,
    layerId: selectCurrentLayer(state)?.id ?? "",
  });
}
