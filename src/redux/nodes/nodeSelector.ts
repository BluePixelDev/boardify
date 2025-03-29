import { createSelector } from "reselect"
import { RootState } from "../store"

export const getNodeById = (state: RootState, id: string) =>
    state.graphNodes.nodes.find((node) => node.id === id)

export const getAllNodes = (state: RootState) =>
    state.graphNodes.nodes

export const getAllSelectedNodes = createSelector(
    (state: RootState) => state.graphNodes.nodes,
    (state: RootState) => state.graphNodes.selectedNodeIds,
    
    (nodes, selectedNodeIds) => {
    return nodes.filter((node) => selectedNodeIds.includes(node.id))
})

export const isNodeSelected = (state: RootState, id: string): boolean =>
    state.graphNodes.selectedNodeIds.includes(id)