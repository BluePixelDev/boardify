import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardNode } from "../../nodes/types/node-types";

interface GraphNodeState {
    nodes: BoardNode[];
}

const initialState: GraphNodeState = {
    nodes: []
};

const graphNodesSlice = createSlice({
    name: "graphNodes",
    initialState,
    reducers: {
        addNode: (state, action: PayloadAction<BoardNode>) => {
            state.nodes.push(action.payload);
        },
        removeNode: (state, action: PayloadAction<string>) => {
            state.nodes = state.nodes.filter(node => node.id !== action.payload);
        },
        updateNode: (state, action: PayloadAction<Partial<BoardNode> & { id: string }>) => {
            const { id, ...updatedProperties } = action.payload;
            const index = state.nodes.findIndex(node => node.id === id);
            
            if (index !== -1) {
                state.nodes[index] = {
                    ...state.nodes[index],
                    ...updatedProperties 
                };
            }
        },
    }
});

export type { GraphNodeState };
export const { addNode, removeNode, updateNode } = graphNodesSlice.actions;
export default graphNodesSlice.reducer;