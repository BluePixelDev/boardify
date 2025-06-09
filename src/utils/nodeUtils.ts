import {
  BoardNodeData,
  BoardNodeSize,
  selectCurrentLayer,
} from "@/features/board";
import { ImportEvent } from "@/features/importing";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a new graph node with a unique identifier.
 *
 * @typeParam T - The type of the data contained in the graph node.
 * @param partialNode - An object containing all properties of `GraphNodeData<T>` except for the `id`.
 * @returns A new `GraphNodeData<T>` object with a generated unique `id` and the provided properties.
 */
export function createNode<T>(
  partialNode: Omit<BoardNodeData<T>, "id">
): BoardNodeData<T> {
  return {
    id: uuidv4(),
    ...partialNode,
  };
}

/**
 * Creates a new graph node data object based on an import event, node size, and partial node data.
 *
 * This function calculates the node's position in graph coordinates by transforming the event's screen position
 * using the current graph view's transformation matrix. The node is centered at the event position, and a unique
 * ID is generated for the node. The node is assigned to the currently selected layer, if available.
 *
 * @typeParam T - The type of the node's data payload.
 * @param importEvent - The import event containing the position and access to the current graph state.
 * @param size - The size of the node to be created.
 * @param partialNode - Partial node data, excluding `id`, `position`, `layerId`, and `size`, which are set by this function.
 * @returns A fully constructed `GraphNodeData<T>` object ready to be added to the graph.
 */
export function createNodeFromImportEvent<T>(
  importEvent: ImportEvent,
  size: BoardNodeSize,
  partialNode: Omit<BoardNodeData<T>, "id" | "position" | "layerId" | "size">
): BoardNodeData<T> {
  const currentState = importEvent.getState();
  const { transform } = currentState.board.view;
  const eventPosition = importEvent.position;

  const [scaleX, , , scaleY, translateX, translateY] = transform;
  const graphX = (eventPosition.x - translateX) / scaleX - size.width / 2;
  const graphY = (eventPosition.y - translateY) / scaleY - size.height / 2;

  return {
    id: uuidv4(),
    position: {
      x: graphX,
      y: graphY,
    },
    size,
    layerId: selectCurrentLayer(currentState)?.id ?? "",
    ...partialNode,
  };
}
