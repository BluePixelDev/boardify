import { configureStore } from '@reduxjs/toolkit'
import cssSnippetsSlice from "./features/app-snippets/redux/snippetSlice"
import nodesSlice from "./features/board/redux/nodesSlice"

const store = configureStore({
    reducer:{
        cssSnippets: cssSnippetsSlice,
        graphNodes: nodesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;