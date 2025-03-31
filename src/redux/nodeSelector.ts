import { RootState } from "./store";

export const getNodeById = (state: RootState, id: string) =>
    state.graphNodes.nodes.find((node) => node.id === id);

export const getAllNodes = (state: RootState) =>
    state.graphNodes.nodes;

export const isNodeSelected = (state: RootState, id: string): boolean =>
    state.graphNodes.selectedNodeIds.find((selId) => selId == id) != undefined