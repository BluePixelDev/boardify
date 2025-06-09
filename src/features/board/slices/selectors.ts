import { createSelector } from "@reduxjs/toolkit";
import { nodesSelectors } from "./nodes.slice";
import { layerSelectors } from "./layers.slice";
import type { RootState } from "@/redux";

const selectGraphState = (state: RootState) => state.board.nodes;
const selectLayerState = (state: RootState) => state.board.layers;

export const selectAllNodes = (state: RootState) =>
  nodesSelectors.selectAll(selectGraphState(state));
export const selectNodeById = (id: string) => (state: RootState) =>
  nodesSelectors.selectById(selectGraphState(state), id);
export const selectAllLayers = (state: RootState) =>
  layerSelectors.selectAll(selectLayerState(state));
export const selectLayerById = (id: string) => (state: RootState) =>
  layerSelectors.selectById(selectLayerState(state), id);

export const selectSelectedNodeIds = (state: RootState) =>
  selectGraphState(state).selectedNodeIds;
export const selectSelectedLayerId = (state: RootState) =>
  selectLayerState(state).selectedLayerId;

export const selectSelectedNodes = createSelector(
  selectAllNodes,
  selectSelectedNodeIds,
  (nodes, ids) => nodes.filter((n) => ids.includes(n.id))
);

export const selectCurrentLayer = createSelector(
  selectAllLayers,
  selectSelectedLayerId,
  (layers, selId) => layers.find((l) => l.id === selId) ?? null
);

export const selectNodesByLayer = (layerId: string) =>
  createSelector(selectAllNodes, (nodes) =>
    nodes.filter((n) => n.layerId === layerId)
  );

export const selectNodesInCurrentLayer = createSelector(
  selectAllNodes,
  selectSelectedLayerId,
  (nodes, selLayer) => nodes.filter((n) => n.layerId === selLayer)
);

export const isNodeSelected = (nodeId: string) =>
  createSelector(selectSelectedNodeIds, (selectedIds) =>
    selectedIds.includes(nodeId)
  );
