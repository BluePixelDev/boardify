import { selectCurrentLayer } from "@/features/board/store/layersSelectors";
import { store } from "@/redux";
import { CreateBaseNodeFn, CreateNodeFromImportEventFn } from "@boardify/sdk";
import { v4 as uuidv4 } from "uuid";

/**
 * Constructs a full node object with default values and a unique ID.
 *
 * @typeParam T - The node's data type.
 * @param overrides - Fields to override the defaults.
 * @returns A new fully-formed `NodeData<T>` object.
 */
export const createBaseNode: CreateBaseNodeFn = (overrides) => {
  return {
    id: uuidv4(),
    zIndex: overrides.zIndex ?? 0,
    aspectLocked: overrides.aspectLocked ?? false,
    ...overrides,
  };
};

/**
 * Creates a new node from an import event by projecting screen coordinates into graph space.
 *
 * @typeParam T - The type of node data.
 * @param importEvent - The import trigger event.
 * @param size - Desired node size.
 * @param partialNode - Partial node fields (excluding core positioning).
 * @returns A fully formed `NodeData<T>` object.
 */
export const createNodeFromImportEvent: CreateNodeFromImportEventFn = (
  importEvent,
  size,
  partialNode
) => {
  const state = store.getState();
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
};
