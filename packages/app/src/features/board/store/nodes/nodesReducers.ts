// nodesReducers.ts
import { PayloadAction } from "@reduxjs/toolkit";
import { nodesAdapter, NodesState } from "./nodesAdapter";
import { NodeData } from "@/features/board";
import {
  doesNodeIntersectRect,
  getMaxZIndex,
  moveMultipleNodesBackward,
  moveMultipleNodesForward,
  normalizeZIndices,
} from "./nodeUtils";

export const nodesReducers = {
  addNode: (state: NodesState, action: PayloadAction<NodeData>) => {
    const maxZ = getMaxZIndex(state);
    const newNode = {
      ...action.payload,
      zIndex: maxZ + 1,
    };

    nodesAdapter.addOne(state, newNode);
  },
  updateNode: nodesAdapter.updateOne,
  removeNode: (state: NodesState, action: PayloadAction<string>) => {
    nodesAdapter.removeOne(state, action.payload);
    state.selectedNodeIds = state.selectedNodeIds.filter(
      (id) => id !== action.payload
    );
    normalizeZIndices(state);
  },
  moveSelectedNodes: (
    state: NodesState,
    action: PayloadAction<{ dx: number; dy: number }>
  ) => {
    const { dx, dy } = action.payload;
    state.selectedNodeIds.forEach((id) => {
      const node = state.entities[id];
      if (node) {
        nodesAdapter.updateOne(state, {
          id,
          changes: {
            position: {
              x: node.position.x + dx,
              y: node.position.y + dy,
            },
          },
        });
      }
    });
  },
  bringSelectedNodesForward: (state: NodesState) => {
    moveMultipleNodesForward(state, state.selectedNodeIds);
  },
  sendSelectedNodesBackward: (state: NodesState) => {
    moveMultipleNodesBackward(state, state.selectedNodeIds);
  },

  // Selection
  markNodeSelected: (state: NodesState, action: PayloadAction<string>) => {
    const id = action.payload;
    if (!state.selectedNodeIds.includes(id)) {
      state.selectedNodeIds.push(id);
    }
  },
  markAllNodesSelected: (state: NodesState) => {
    const allIds = state.ids as string[];
    state.selectedNodeIds = [...new Set([...state.selectedNodeIds, ...allIds])];
  },
  unmarkNodeSelected: (state: NodesState, action: PayloadAction<string>) => {
    state.selectedNodeIds = state.selectedNodeIds.filter(
      (id) => id !== action.payload
    );
  },
  clearAllNodeSelections: (state: NodesState) => {
    state.selectedNodeIds = [];
  },
  replaceSelection: (state: NodesState, action: PayloadAction<string>) => {
    state.selectedNodeIds = [action.payload];
  },
  toggleNodeSelectionStatus: (
    state: NodesState,
    action: PayloadAction<string>
  ) => {
    const id = action.payload;
    if (state.selectedNodeIds.includes(id)) {
      state.selectedNodeIds = state.selectedNodeIds.filter(
        (selId) => selId !== id
      );
    } else {
      state.selectedNodeIds.push(id);
    }
  },
  selectNodesInRect: (
    state: NodesState,
    action: PayloadAction<{
      x: number;
      y: number;
      width: number;
      height: number;
    }>
  ) => {
    const rect = action.payload;
    const selected = Object.values(state.entities)
      .filter((node): node is NodeData => !!node)
      .filter((node) => doesNodeIntersectRect(node, rect))
      .map((node) => node.id);

    state.selectedNodeIds = selected;
  },
};
