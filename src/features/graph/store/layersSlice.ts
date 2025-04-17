import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit"
import { Layer } from "./types"

const layersAdapter = createEntityAdapter<Layer>()

export const layerSelectors = layersAdapter.getSelectors()

const layersSlice = createSlice({
    name: "layers",
    initialState: layersAdapter.getInitialState({
        selectedLayerId: null as string | null,
    }),
    reducers: {
        addLayer: layersAdapter.addOne,
        removeLayer: layersAdapter.removeOne,
        updateLayer: layersAdapter.updateOne,
        selectLayer: (state, action: PayloadAction<string | null>) => {
            state.selectedLayerId = action.payload;
        },
    }
})

export const {
    addLayer,
    removeLayer,
    updateLayer,
    selectLayer,
} = layersSlice.actions

export default layersSlice.reducer