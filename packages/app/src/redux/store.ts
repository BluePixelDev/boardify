import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "@/features/settings/store";
import appReducer from "@/redux/slices/appSlice";
import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./slices/notificationsSlice";
import snippetSlice from "@/features/snippets/store/snippetSlice";
import keybindsSlice from "@/features/keybinds/redux/keybindsSlice";
import { boardReducer } from "@/features/board/store";

export const store = configureStore({
  reducer: {
    app: appReducer,
    settings: settingsReducer,
    board: combineReducers(boardReducer),
    keybinds: keybindsSlice,
    cssSnippets: snippetSlice,
    notifications: notificationsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
