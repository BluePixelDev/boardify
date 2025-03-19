import { RootState } from "./store";

export const selectNodeById = (state: RootState, id: string) =>
    state.graphNodes.nodes.find((node) => node.id === id);

export const selectAllNodes = (state: RootState) => state.graphNodes.nodes;

export const isNodeSelected = (state: RootState, id: string): boolean => {
    return state.graphNodes.selected.find((selId) => selId == id) != undefined
}