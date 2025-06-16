import { createSelector } from "reselect";
import { RootState } from "../../../redux/types";
import { layerSelectors } from "./layersSlice";

const selectLayerState = (state: RootState) => state.board.layers;

export const selectAllLayers = (state: RootState) =>
  layerSelectors.selectAll(selectLayerState(state));
export const selectLayerById = (id: string) => (state: RootState) =>
  layerSelectors.selectById(selectLayerState(state), id);

export const selectSelectedLayerId = (state: RootState) =>
  selectLayerState(state).selectedLayerId;

export const selectCurrentLayer = createSelector(
  selectAllLayers,
  selectSelectedLayerId,
  (layers, selId) => layers.find((l) => l.id === selId) ?? null
);
