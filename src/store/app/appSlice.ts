import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpen: boolean;
  isProjectOpen: boolean;
  projectName: string | null;
  projectRootPath: string | null;
}

const initialState: AppState = {
  isSidebarOpen: false,
  isProjectOpen: false,
  projectName: null,
  projectRootPath: null,
};

const appSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openProject: (
      state,
      action: PayloadAction<{ name: string; basePath: string }>
    ) => {
      state.isProjectOpen = true;
      state.projectRootPath = action.payload.basePath;
      state.projectName = action.payload.name;
    },
    closeProject: (state) => {
      state.isProjectOpen = false;
      state.projectRootPath = null;
    },
  },
});

export type { AppState };
export const { toggleSidebar, openProject, closeProject } = appSlice.actions;
export default appSlice.reducer;
