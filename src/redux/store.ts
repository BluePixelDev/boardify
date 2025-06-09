import { configureStore } from "@reduxjs/toolkit";
import { keybindsReducer } from "@/features/keybinds";
import { settingsReducer } from "@/features/settings/store";
import snippetsReducer from "@/features/snippets/snippetSlice";
import appReducer from "@/redux/app/appSlice";
import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationsSlice";
import { boardReducers } from "@/features/board/slices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    board: combineReducers(boardReducers),
    keybinds: keybindsReducer,
    cssSnippets: snippetsReducer,
    notifications: notificationsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
