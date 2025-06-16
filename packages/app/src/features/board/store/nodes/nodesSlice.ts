import { NodeData } from "@/features/board";
import { nodesReducers } from "./nodesReducers";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const nodesAdapter = createEntityAdapter<NodeData>();
export const nodesSelectors = nodesAdapter.getSelectors();

export interface NodesState {
  selectedNodeIds: string[];
}

const initialState = nodesAdapter.getInitialState<NodesState>({
  selectedNodeIds: [],
});

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: nodesReducers,
});

export const {
  addNode,
  updateNode,
  removeNode,
  moveSelectedNodes,
  markNodeSelected,
  markAllNodesSelected,
  unmarkNodeSelected,
  clearAllNodeSelections,
  replaceSelection,
  toggleNodeSelectionStatus,
  selectNodesInRect,

  bringSelectedNodesForward,
  sendSelectedNodesBackward,
} = nodesSlice.actions;

export default nodesSlice.reducer;
