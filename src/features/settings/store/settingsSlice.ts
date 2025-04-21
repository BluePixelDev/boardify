import { createSlice } from "@reduxjs/toolkit"

interface SettingsState {
    isSettingsModalOpen: boolean
}

const initialState: SettingsState = {
    isSettingsModalOpen: false,
}


const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleSettingsModal: (state) => {
            state.isSettingsModalOpen = !state.isSettingsModalOpen
        },
        openSettingsModal: (state) => {
            state.isSettingsModalOpen = true
        }
    },
})

export const {
    toggleSettingsModal,
    openSettingsModal,
} = settingsSlice.actions

export default settingsSlice.reducer
export type { SettingsState }