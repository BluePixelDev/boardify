import { configureStore } from '@reduxjs/toolkit'
import cssSnippetsSlice from "./redux/snippetSlice"

const store = configureStore({
    reducer:{
        cssSnippets: cssSnippetsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;