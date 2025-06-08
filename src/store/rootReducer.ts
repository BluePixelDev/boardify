import { graphReducer, layerReducer } from "@/features/board";
import { keybindsReducer } from "@/features/keybinds";
import { settingsReducer } from "@/features/settings/store";
import snippetsReducer from "@/features/snippets/snippetSlice";
import appReducer from "@/store/app/appSlice";
import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationsSlice";

const rootReducer = combineReducers({
  app: appReducer,
  settings: settingsReducer,
  graph: graphReducer,
  layers: layerReducer,
  keybinds: keybindsReducer,
  cssSnippets: snippetsReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
