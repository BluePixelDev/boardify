import { configureStore } from '@reduxjs/toolkit'
import cssSnippetsSlice from "../features/app/snippets/redux/snippetSlice"
import nodesSlice from './nodesSlice'
import appSlice from './appSlice'

const store = configureStore({
    reducer: {
        cssSnippets: cssSnippetsSlice,
        graphNodes: nodesSlice,
        app: appSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;