import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type KeyModifiers = {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
}

export type Keybind = KeyModifiers & {
    key: string
    action: string
}


export enum KeyAction {
    SELECT_ALL = 'selectAll',
    DESELECT_ALL = 'deselectAll',
    DELETE_SELECTED = 'deleteSelected',
    MOVE_LEFT = 'moveLeft',
    MOVE_RIGHT = 'moveRight',
    MOVE_UP = 'moveUp',
    MOVE_DOWN = 'moveDown',
    MOVE_LEFT_LARGE = 'moveLeftLarge',
    MOVE_RIGHT_LARGE = 'moveRightLarge',
    MOVE_UP_LARGE = 'moveUpLarge',
    MOVE_DOWN_LARGE = 'moveDownLarge',
    TOGGLE_SIDEBAR = 'toggleSidebar',
}

const defaultKeybinds: Record<string, Keybind> = {
    [KeyAction.SELECT_ALL]: { key: 'a', ctrl: true, action: KeyAction.SELECT_ALL },
    [KeyAction.DESELECT_ALL]: { key: 'Escape', action: KeyAction.DESELECT_ALL },
    [KeyAction.DELETE_SELECTED]: { key: 'Delete', action: KeyAction.DELETE_SELECTED },
    [KeyAction.MOVE_LEFT]: { key: 'ArrowLeft', action: KeyAction.MOVE_LEFT },
    [KeyAction.MOVE_RIGHT]: { key: 'ArrowRight', action: KeyAction.MOVE_RIGHT },
    [KeyAction.MOVE_UP]: { key: 'ArrowUp', action: KeyAction.MOVE_UP },
    [KeyAction.MOVE_DOWN]: { key: 'ArrowDown', action: KeyAction.MOVE_DOWN },
    [KeyAction.MOVE_LEFT_LARGE]: { key: 'ArrowLeft', shift: true, action: KeyAction.MOVE_LEFT_LARGE },
    [KeyAction.MOVE_RIGHT_LARGE]: { key: 'ArrowRight', shift: true, action: KeyAction.MOVE_RIGHT_LARGE },
    [KeyAction.MOVE_UP_LARGE]: { key: 'ArrowUp', shift: true, action: KeyAction.MOVE_UP_LARGE },
    [KeyAction.MOVE_DOWN_LARGE]: { key: 'ArrowDown', shift: true, action: KeyAction.MOVE_DOWN_LARGE },
    [KeyAction.TOGGLE_SIDEBAR]: { key: 'b', ctrl: true, action: KeyAction.TOGGLE_SIDEBAR },
}

interface SettingsState {
    keybinds: Record<string, Keybind>
}

const initialState: SettingsState = {
    keybinds: defaultKeybinds
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateKeybind: (state, action: PayloadAction<{ actionName: string, keybind: Keybind }>) => {
            const { actionName, keybind } = action.payload
            state.keybinds[actionName] = keybind
        },
        resetKeybinds: (state) => {
            state.keybinds = defaultKeybinds
        },
    }
})

export type { SettingsState }
export const {
    updateKeybind,
    resetKeybinds,
} = settingsSlice.actions
export default settingsSlice.reducer