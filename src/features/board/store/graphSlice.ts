import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { BoardNodeData } from "./types";

const nodesAdapter = createEntityAdapter<BoardNodeData>();
export const graphSelectors = nodesAdapter.getSelectors();

interface GraphViewState {
  position: { x: number; y: number };
  zoom: number;
  transform: number[];
}

interface GraphNodeState {
  selectedNodeIds: string[];
  graphView: GraphViewState;
}

const initialState = nodesAdapter.getInitialState<GraphNodeState>({
  selectedNodeIds: [],
  graphView: {
    position: { x: 0, y: 0 },
    zoom: 1,
    transform: [1, 0, 0, 1, 0, 0],
  },
});

const doesNodeIntersectRect = (
  node: BoardNodeData,
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

const graphSlice = createSlice({
  name: "graph",
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
        .filter((node): node is BoardNodeData => !!node)
        .filter((node) => doesNodeIntersectRect(node, rect))
        .map((node) => node.id);

      state.selectedNodeIds = selected;
    },

    // View transform
    setPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      state.graphView.position = { x, y };
      state.graphView.transform[4] = x;
      state.graphView.transform[5] = y;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      const z = action.payload;
      state.graphView.zoom = z;
      state.graphView.transform[0] = z;
      state.graphView.transform[3] = z;
    },
    setTransform: (state, action: PayloadAction<number[]>) => {
      const m = action.payload;
      state.graphView.transform = m;
      state.graphView.zoom = m[0];
      state.graphView.position = { x: m[4], y: m[5] };
    },
  },
});

export const {
  addNode,
  removeNode,
  updateNode,
  markNodeSelected,
  markAllNodesSelected,
  unmarkNodeSelected,
  clearAllNodeSelections,
  replaceSelection,
  toggleNodeSelectionStatus,
  setPosition,
  setZoom,
  setTransform,
  selectNodesInRect,
} = graphSlice.actions;

export default graphSlice.reducer;
