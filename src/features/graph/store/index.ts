import graphReducer from "./graphSlice"
import layersReducer from "./layersSlice"
import { configureStore } from "@reduxjs/toolkit"

export * from "./selectors"
export type * from "./types"
export * from "./layersSlice"
export * from "./graphSlice"

export const store = configureStore({
    reducer: {
        graph: graphReducer,
        layers: layersReducer,
    },
})