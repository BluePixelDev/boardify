import { GraphViewNode } from "@/features/graphview/types/graphTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphNodeState {
    nodes: GraphViewNode[];
}

const initialState: GraphNodeState = {
    nodes: []
};

const graphNodesSlice = createSlice({
    name: "graphNodes",
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<GraphViewNode>) => {
            state.nodes.push(action.payload);
        },
        removeNode: (state, action: PayloadAction<string>) => {
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
        },
        updateNode: (state, action: PayloadAction<Partial<GraphViewNode> & { id: string }>) => {
            const { id, ...updatedProperties } = action.payload;
            state.nodes = state.nodes.map(node =>
                node.id === id ? { ...node, ...updatedProperties } : node
            );
        },
    }
});

export type { GraphNodeState };
export const { addNode, removeNode, updateNode } = graphNodesSlice.actions;
export default graphNodesSlice.reducer;