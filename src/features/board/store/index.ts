import graphReducer from "./graphSlice";
import layersReducer from "./layersSlice";
import { configureStore } from "@reduxjs/toolkit";

export * from "./selectors";
export type * from "./types";
export * from "./layersSlice";
export * from "./graphSlice";
export { default as "graphReducer" } from "./graphSlice";
export { default as "layerReducer" } from "./layersSlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    layers: layersReducer,
  },
});
