import {
  isNodeSelected,
  moveSelectedNodes,
  NodeData,
  NodePosition,
  NodeSize,
  selectNodeById,
  updateNode,
} from "@/features/board";
import { useAppDispatch, useAppSelector } from "@/redux";
import { UseNodeResult } from "@boardify/sdk";
import { shallowEqual } from "react-redux";

/**
 * Hook to interact with a node by ID, allowing updates, movement,
 * and resizing operations, integrated with Redux.
 */
export function useNode<T = unknown>(nodeId: string): UseNodeResult<T> {
  const node = useAppSelector(selectNodeById<T>(nodeId), shallowEqual);
  const isSelected = useAppSelector(isNodeSelected(nodeId));
  const dispatch = useAppDispatch();

  const update = (changes: Partial<NodeData<unknown>>) => {
    dispatch(updateNode({ id: nodeId, changes }));
  };

  const moveSelected = (newPos: NodePosition) => {
    dispatch(
      moveSelectedNodes({
        dx: newPos.x - (node?.position.x ?? 0),
        dy: newPos.y - (node?.position.y ?? 0),
      })
    );
  };

  const move = (newPos: NodePosition) => {
    dispatch(updateNode({ id: nodeId, changes: { position: newPos } }));
  };

  const resize = (newSize: NodeSize) => {
    dispatch(updateNode({ id: nodeId, changes: { size: newSize } }));
  };

  const aspectRatio =
    node?.aspectLocked && node.size.height !== 0
      ? node.size.width / node.size.height
      : undefined;

  return {
    node,
    size: node?.size,
    aspectRatio,
    isSelected,
    update,
    moveSelected,
    move,
    resize,
  };
}
