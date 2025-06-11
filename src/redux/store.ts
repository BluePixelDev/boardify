import { configureStore } from "@reduxjs/toolkit";
import { keybindsReducer } from "@/features/keybinds";
import { settingsReducer } from "@/features/settings/store";
import appReducer from "@/redux/slices/appSlice";
import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./slices/notificationsSlice";
import nodesSlice from "./slices/nodesSlice";
import boardSlice from "./slices/boardSlice";
import layersSlice from "./slices/layersSlice";
import snippetSlice from "./slices/snippetSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    board: combineReducers({
      nodes: nodesSlice,
      view: boardSlice,
      layers: layersSlice,
    }),
    keybinds: keybindsReducer,
    cssSnippets: snippetSlice,
    notifications: notificationsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
