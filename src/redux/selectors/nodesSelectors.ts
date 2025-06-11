import { NodeData } from "@/features/board/nodes";
import { nodesSelectors } from "../slices/nodesSlice";
import { RootState } from "../types";
import { createSelector } from "reselect";

const selectGraphState = (state: RootState) => state.board.nodes;
const selectLayerState = (state: RootState) => state.board.layers;

export const selectAllNodes = (state: RootState) =>
  nodesSelectors.selectAll(selectGraphState(state));

export const selectNodeById =
  <T = unknown>(id: string) =>
  (state: RootState): NodeData<T> | undefined =>
    nodesSelectors.selectById(selectGraphState(state), id) as
      | NodeData<T>
      | undefined;
export const selectSelectedNodeIds = (state: RootState) =>
  selectGraphState(state).selectedNodeIds;
export const selectSelectedLayerId = (state: RootState) =>
  selectLayerState(state).selectedLayerId;

export const selectSelectedNodes = createSelector(
  selectAllNodes,
  selectSelectedNodeIds,
  (nodes, ids) => nodes.filter((n) => ids.includes(n.id))
);
export const selectNodesByLayer = (layerId: string) =>
  createSelector(selectAllNodes, (nodes) =>
    nodes.filter((n) => n.layerId === layerId)
  );

export const isNodeSelected = (nodeId: string) =>
  createSelector(selectSelectedNodeIds, (selectedIds) =>
    selectedIds.includes(nodeId)
  );

export const selectNodesInCurrentLayer = createSelector(
  selectAllNodes,
  selectSelectedLayerId,
  (nodes, selLayer) => nodes.filter((n) => n.layerId === selLayer)
);
