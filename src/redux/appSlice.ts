import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    openSidebar: boolean
}

const initialState: AppState = {
    openSidebar: true
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.openSidebar = !state.openSidebar
        }
    }
})

export type { AppState };
export const { toggleSidebar } = appSlice.actions;
export default appSlice.reducer;

