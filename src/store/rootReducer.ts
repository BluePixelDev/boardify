import { combineReducers } from "@reduxjs/toolkit"
import appReducer from "@/store/app/appSlice"
import { settingsReducer } from "@/features/settings/store"
import graphNodesReducer from "@/features/graph/store/graphSlice"
import layersReducer from "@/features/graph/store/layersSlice"
import snippetsReducer from "@/features/snippets/snippetSlice"
import { keybindsReducer } from "@/features/keybinds"
import notificationsReducer from "./notificationsSlice"


const rootReducer = combineReducers({
    app: appReducer,
    settings: settingsReducer,
    graph: graphNodesReducer,
    layers: layersReducer,
    keybinds: keybindsReducer,
    cssSnippets: snippetsReducer,
    notifications: notificationsReducer,
})

export default rootReducer
