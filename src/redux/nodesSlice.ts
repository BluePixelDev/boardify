import { GraphNodeData } from "@/features/graph/graphview/types/graphTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphNodeState {
    nodes: GraphNodeData[]
    selected: string[]
}

const initialState: GraphNodeState = {
    nodes: [],
    selected: []
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
        selectNode: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            state.selected.push(id)
        },
        deselectNode: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload
            state.selected = state.selected.filter(selId => selId !== id);

        },
        deselectAllNodes: (state) => {
            state.selected = []
        }
    }
});

export type { GraphNodeState };
export const { addNode, removeNode, updateNode, selectNode, deselectNode, deselectAllNodes } = nodesSlice.actions;
export default nodesSlice.reducer;