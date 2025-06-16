/* ==== NODES ==== */
export * from "./nodes";

/* ==== LAYERS ==== */
export * from "./layersSelectors";
export * from "./layersSlice";

/* ==== VIEW ==== */
export * from "./viewSlice";

import nodesReducer from "./nodes/nodesSlice";
import layersReducer from "./layersSlice";
import viewReducer from "./viewSlice";

export const boardReducer = {
  nodes: nodesReducer,
  layers: layersReducer,
  view: viewReducer,
};
