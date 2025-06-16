import { createEntityAdapter } from "@reduxjs/toolkit";
import { NodeData } from "@/features/board";

export const nodesAdapter = createEntityAdapter<NodeData>();

export interface NodesState
  extends ReturnType<typeof nodesAdapter.getInitialState> {
  selectedNodeIds: string[];
}

export const initialNodesState: NodesState = nodesAdapter.getInitialState({
  selectedNodeIds: [],
});
