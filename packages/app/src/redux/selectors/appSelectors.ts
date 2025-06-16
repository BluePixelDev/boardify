import { RootState } from "../types";

export const isSidebarOpen = (state: RootState): boolean => {
  return state.app.isSidebarOpen;
};
