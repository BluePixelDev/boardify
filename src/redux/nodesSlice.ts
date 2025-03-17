import { GraphNodeData } from "@/features/graphview/types/graphTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphNodeState {
    nodes: GraphNodeData[];
}

const initialState: GraphNodeState = {
    nodes: []
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
    }
});

export type { GraphNodeState };
export const { addNode, removeNode, updateNode } = nodesSlice.actions;
export default nodesSlice.reducer;