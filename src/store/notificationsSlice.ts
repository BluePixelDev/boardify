import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
    message: string | null
    type: 'error' | 'success' | null
}

const initialState: NotificationState = {
    message: null,
    type: null,
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showErrorNotification: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.type = 'error'
        },
        showSuccessNotification: (state, action: PayloadAction<string>) => {
            state.message = action.payload
            state.type = 'success'
        },
        clearNotification: (state) => {
            state.message = null
            state.type = null
        },
    },
})

export const {
    showErrorNotification,
    showSuccessNotification,
    clearNotification,
} = notificationsSlice.actions

export default notificationsSlice.reducer
