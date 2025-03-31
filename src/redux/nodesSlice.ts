import { GraphNodeData } from "@/features/graph/graphview/types/graphTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphNodeState {
    nodes: GraphNodeData[]
    selectedNodeIds: string[]
}

const initialState: GraphNodeState = {
    nodes: [],
    selectedNodeIds: []
};

const nodesSlice = createSlice({
    name: "graphNodes",
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<GraphNodeData>) => {
            state.nodes.push(action.payload);
        },
        removeNode: (state, action: PayloadAction<string>) => {
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
        },
        updateNode: (state, action: PayloadAction<Partial<GraphNodeData> & { id: string }>) => {
            const { id, ...updatedProperties } = action.payload;
            state.nodes = state.nodes.map(node =>
                node.id === id ? { ...node, ...updatedProperties } : node
            );
        },

        // Selection
        selectNode: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            state.selectedNodeIds.push(id)
        },
        deselectNode: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            state.selectedNodeIds = state.selectedNodeIds.filter(selId => selId !== id);

        },
        deselectAllNodes: (state) => {
            state.selectedNodeIds = []
        },
        replaceSelection: (state, action: PayloadAction<string>) => {
            state.selectedNodeIds = [action.payload];
        },
        toggleNodeSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.selectedNodeIds.includes(id)) {
                state.selectedNodeIds = state.selectedNodeIds.filter((selId) => selId !== id);
            } else {
                state.selectedNodeIds.push(id);
            }
        },
    }
});

export type { GraphNodeState };
export const {
    addNode,
    removeNode,
    updateNode,
    selectNode,
    deselectNode,
    deselectAllNodes,
    replaceSelection,
    toggleNodeSelection
} = nodesSlice.actions;
export default nodesSlice.reducer;