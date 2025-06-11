import { createSelector } from "reselect";
import { layerSelectors } from "../slices/layersSlice";
import { RootState } from "../types";
import { selectSelectedLayerId } from "./nodesSelectors";

const selectLayerState = (state: RootState) => state.board.layers;

export const selectAllLayers = (state: RootState) =>
  layerSelectors.selectAll(selectLayerState(state));
export const selectLayerById = (id: string) => (state: RootState) =>
  layerSelectors.selectById(selectLayerState(state), id);

export const selectCurrentLayer = createSelector(
  selectAllLayers,
  selectSelectedLayerId,
  (layers, selId) => layers.find((l) => l.id === selId) ?? null
);
