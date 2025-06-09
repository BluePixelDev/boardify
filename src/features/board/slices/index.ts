import graphReducer from "./nodes.slice";
import layerReducer from "./layers.slice";
import viewReducer from "./view.slice";

export const boardReducers = {
  nodes: graphReducer,
  layers: layerReducer,
  view: viewReducer,
};

export * from "./selectors";
export * from "./nodes.slice";
export * from "./view.slice";
export * from "./layers.slice";
