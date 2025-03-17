import { RootState } from "./store";

export const selectNodeById = (state: RootState, nodeId: string) =>
    state.graphNodes.nodes.find((node) => node.id === nodeId);

export const selectAllNodes = (state: RootState) => state.graphNodes.nodes;