// src/app/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit"
import graphNodesReducer from "@/features/graph/store/graphSlice"
import layersReducer from "@/features/graph/store/layersSlice"
import appReducer from "@/features/app/appSlice"
import snippetsReducer from "@/features/snippets/snippetSlice"
import { keybindsReducer } from "@/features/keybinds"
import notificationsReducer from "./notificationsSlice"


const rootReducer = combineReducers({
    graph: graphNodesReducer,
    layers: layersReducer,
    app: appReducer,
    keybinds: keybindsReducer,
    cssSnippets: snippetsReducer,
    notifications: notificationsReducer,
})

export default rootReducer
