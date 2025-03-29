import { configureStore } from '@reduxjs/toolkit'
import cssSnippetsSlice from "../features/app/snippets/redux/snippetSlice"
import nodesSlice from './nodes/nodesSlice'
import appSlice from './app/appSlice'
import settingsSlice from './settings/settingsSlice'

const store = configureStore({
    reducer: {
        cssSnippets: cssSnippetsSlice,
        graphNodes: nodesSlice,
        app: appSlice,
        settings: settingsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;