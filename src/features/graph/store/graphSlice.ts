import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit"
import { GraphNodeData } from "./types"

const nodesAdapter = createEntityAdapter<GraphNodeData>()
export const graphSelectors = nodesAdapter.getSelectors()

interface GraphNodeState {
    selectedNodeIds: string[]
}

const initialState = nodesAdapter.getInitialState<GraphNodeState>({
    selectedNodeIds: []
})

const graphSlice = createSlice({
    name: "graph",
    initialState,
    reducers: {
        // CRUD
        addNode: nodesAdapter.addOne,
        updateNode: nodesAdapter.updateOne,
        removeNode: (state, action: PayloadAction<string>) => {
            nodesAdapter.removeOne(state, action.payload)
            state.selectedNodeIds = state.selectedNodeIds.filter(id => id !== action.payload)
        },

        // Selection actions
        markNodeSelected: (state, action: PayloadAction<string>) => {
            const id = action.payload
            if (!state.selectedNodeIds.includes(id)) {
                state.selectedNodeIds.push(id)
            }
        },
        markAllNodesSelected: (state) => {
            const allIds = state.ids as string[]
            state.selectedNodeIds = [...new Set([...state.selectedNodeIds, ...allIds])]
        },
        unmarkNodeSelected: (state, action: PayloadAction<string>) => {
            state.selectedNodeIds = state.selectedNodeIds.filter(id => id !== action.payload)
        },
        clearAllNodeSelections: (state) => {
            state.selectedNodeIds = []
        },
        replaceSelection: (state, action: PayloadAction<string>) => {
            state.selectedNodeIds = [action.payload]
        },
        toggleNodeSelectionStatus: (state, action: PayloadAction<string>) => {
            const id = action.payload
            if (state.selectedNodeIds.includes(id)) {
                state.selectedNodeIds = state.selectedNodeIds.filter(selId => selId !== id)
            } else {
                state.selectedNodeIds.push(id)
            }
        }
    }
})

export const {
    addNode,
    removeNode,
    updateNode,
    markNodeSelected,
    markAllNodesSelected,
    unmarkNodeSelected,
    clearAllNodeSelections,
    replaceSelection,
    toggleNodeSelectionStatus
} = graphSlice.actions

export default graphSlice.reducer
