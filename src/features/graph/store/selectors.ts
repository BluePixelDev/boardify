import { createSelector } from "@reduxjs/toolkit"
import { graphSelectors } from "./graphSlice"
import { RootState } from "@/store"

export const selectAllNodes = (state: RootState) =>
    graphSelectors.selectAll(state.graphNodes)

export const selectNodeById = (id: string) => (state: RootState) =>
    graphSelectors.selectById(state.graphNodes, id)

export const selectAllSelectedNodeIds = (state: RootState) =>
    state.graphNodes.selectedNodeIds

export const selectSelectedNodes = createSelector(
    (state: RootState) => graphSelectors.selectAll(state.graphNodes),
    (state: RootState) => state.graphNodes.selectedNodeIds,
    (nodes, selectedIds) => nodes.filter(node => selectedIds.includes(node.id))
)

export const isNodeSelected = (id: string) => (state: RootState): boolean =>
    state.graphNodes.selectedNodeIds.includes(id)

export const selectNodesByLayer = (layerId: string) =>
    createSelector(
        graphSelectors.selectAll,
        nodes => nodes.filter(node => node.layerId === layerId)
    )

export const selectSelectedLayerId = (state: RootState) =>
    state.layers.selectedLayerId

export const selectCurrentLayer = createSelector(
    (state: RootState) => state.layers.entities,
    selectSelectedLayerId,
    (entities, selectedId) => (selectedId ? entities[selectedId] : null)
)

export const selectNodesInCurrentLayer = createSelector(
    [selectAllNodes, selectSelectedLayerId],
    (nodes, selectedLayerId) => nodes.filter(node => node.layerId === selectedLayerId)
);