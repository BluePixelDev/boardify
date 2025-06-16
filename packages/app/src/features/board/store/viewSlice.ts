import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GraphViewState {
  position: { x: number; y: number };
  zoom: number;
  transform: number[];
}

const initialState: GraphViewState = {
  position: { x: 0, y: 0 },
  zoom: 1,
  transform: [1, 0, 0, 1, 0, 0],
};

const viewSlice = createSlice({
  name: "boardView",
  initialState,
  reducers: {
    setViewPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload;
      state.position = { x, y };
      state.transform[4] = x;
      state.transform[5] = y;
    },
    setViewZoom: (state, action: PayloadAction<number>) => {
      const z = action.payload;
      state.zoom = z;
      state.transform[0] = z;
      state.transform[3] = z;
    },
    setViewTransform: (state, action: PayloadAction<number[]>) => {
      const m = action.payload;
      state.transform = m;
      state.zoom = m[0];
      state.position = { x: m[4], y: m[5] };
    },
  },
});

export const { setViewPosition, setViewZoom, setViewTransform } =
  viewSlice.actions;
export default viewSlice.reducer;
