import { AppDispatch } from "@/redux";
import { addNode, removeNode, updateNode } from "@/features/board";
import { NodeData } from "@boardify/sdk";
import { createNodeFromImportEvent } from "@/utils";

export function createNodeService(dispatch: AppDispatch) {
  return {
    addNode<T>(node: NodeData<T>) {
      dispatch(addNode(node));
    },
    removeNode(id: string) {
      dispatch(removeNode(id));
    },
    updateNode<T>(id: string, patch: Partial<NodeData<T>>) {
      dispatch(updateNode({ id, changes: patch }));
    },
    createNodeFromImportEvent,
  };
}
