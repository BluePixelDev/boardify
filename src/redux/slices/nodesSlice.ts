import { NodeData } from "@/features/board";
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

const nodesAdapter = createEntityAdapter<NodeData>();
export const nodesSelectors = nodesAdapter.getSelectors();

interface NodesState {
  selectedNodeIds: string[];
}

const initialState = nodesAdapter.getInitialState<NodesState>({
  selectedNodeIds: [],
});

const doesNodeIntersectRect = (
  node: NodeData,
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  const nodeLeft = node.position.x;
  const nodeRight = node.position.x + node.size.width;
  const nodeTop = node.position.y;
  const nodeBottom = node.position.y + node.size.height;

  const rectLeft = rect.x;
  const rectRight = rect.x + rect.width;
  const rectTop = rect.y;
  const rectBottom = rect.y + rect.height;

  return (
    nodeLeft < rectRight &&
    nodeRight > rectLeft &&
    nodeTop < rectBottom &&
    nodeBottom > rectTop
  );
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    // Node CRUD
    addNode: nodesAdapter.addOne,
    updateNode: nodesAdapter.updateOne,
    removeNode: (state, action: PayloadAction<string>) => {
      nodesAdapter.removeOne(state, action.payload);
      state.selectedNodeIds = state.selectedNodeIds.filter(
        (id) => id !== action.payload
      );
    },

    moveSelectedNodes: (
      state,
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

    // Selection
    markNodeSelected: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.selectedNodeIds.includes(id)) {
        state.selectedNodeIds.push(id);
      }
    },
    markAllNodesSelected: (state) => {
      const allIds = state.ids as string[];
      state.selectedNodeIds = [
        ...new Set([...state.selectedNodeIds, ...allIds]),
      ];
    },
    unmarkNodeSelected: (state, action: PayloadAction<string>) => {
      state.selectedNodeIds = state.selectedNodeIds.filter(
        (id) => id !== action.payload
      );
    },
    clearAllNodeSelections: (state) => {
      state.selectedNodeIds = [];
    },
    replaceSelection: (state, action: PayloadAction<string>) => {
      state.selectedNodeIds = [action.payload];
    },
    toggleNodeSelectionStatus: (state, action: PayloadAction<string>) => {
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
      state,
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
  },
});

export const {
  addNode,
  removeNode,
  updateNode,
  moveSelectedNodes,
  markNodeSelected,
  markAllNodesSelected,
  unmarkNodeSelected,
  clearAllNodeSelections,
  replaceSelection,
  toggleNodeSelectionStatus,
  selectNodesInRect,
} = nodesSlice.actions;

export default nodesSlice.reducer;
