import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { Layer } from "../types";

const layersAdapter = createEntityAdapter<Layer>();
export const layerSelectors = layersAdapter.getSelectors();

const initialLayer = {
  id: "default-layer",
  name: "Layer 1",
  icon: "bxs:layer",
};

const layersSlice = createSlice({
  name: "layers",
  initialState: layersAdapter.getInitialState({
    selectedLayerId: initialLayer.id,
    entities: { [initialLayer.id]: initialLayer },
    ids: [initialLayer.id],
  }),
  reducers: {
    addLayer: layersAdapter.addOne,
    removeLayer: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const allIds = layersAdapter.getSelectors().selectIds(state) as string[];

      if (allIds.length <= 1) {
        return;
      }

      layersAdapter.removeOne(state, idToRemove);
      if (state.selectedLayerId === idToRemove) {
        const remainingIds = allIds.filter((id) => id !== idToRemove);
        state.selectedLayerId = remainingIds[0] ?? null;
      }
    },
    updateLayer: layersAdapter.updateOne,
    selectLayer: (state, action: PayloadAction<string>) => {
      state.selectedLayerId = action.payload;
    },
    reorderLayer(
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      state.ids = arrayMove(
        state.ids as string[],
        action.payload.oldIndex,
        action.payload.newIndex
      );
    },
  },
});

export const { addLayer, removeLayer, updateLayer, selectLayer, reorderLayer } =
  layersSlice.actions;

export default layersSlice.reducer;
