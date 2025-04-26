import { createSelector } from "@reduxjs/toolkit";
import { graphSelectors } from "./graphSlice";
import { RootState } from "@/store";
import { layerSelectors } from "./layersSlice";

export const selectAllNodes = (state: RootState) =>
  graphSelectors.selectAll(state.graph);

export const selectNodeById = (id: string) => (state: RootState) =>
  graphSelectors.selectById(state.graph, id);

export const selectAllSelectedNodeIds = (state: RootState) =>
  state.graph.selectedNodeIds;

export const selectSelectedNodes = createSelector(
  (state: RootState) => graphSelectors.selectAll(state.graph),
  (state: RootState) => state.graph.selectedNodeIds,
  (nodes, selectedIds) => nodes.filter((node) => selectedIds.includes(node.id))
);

export const isNodeSelected =
  (id: string) =>
  (state: RootState): boolean =>
    state.graph.selectedNodeIds.includes(id);

export const selectNodesByLayer = (layerId: string) =>
  createSelector(graphSelectors.selectAll, (nodes) =>
    nodes.filter((node) => node.layerId === layerId)
  );

export const selectAllLayers = (state: RootState) =>
  layerSelectors.selectAll(state.layers);

export const selectSelectedLayerId = (state: RootState) =>
  state.layers.selectedLayerId;

export const selectCurrentLayer = createSelector(
  (state: RootState) => state.layers.entities,
  selectSelectedLayerId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

export const selectNodesInCurrentLayer = createSelector(
  [selectAllNodes, selectSelectedLayerId],
  (nodes, selectedLayerId) =>
    nodes.filter((node) => node.layerId === selectedLayerId)
);

export const selectAllNodesOnCurrentLayer = createSelector(
  [selectAllNodes, selectCurrentLayer],
  (nodes, currentLayer) =>
    nodes.filter((node) => node.layerId === currentLayer?.id)
);
