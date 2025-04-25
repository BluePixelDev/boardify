import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyAction, Keybind } from "../types";

const defaultKeybinds: Record<string, Keybind> = {
  [KeyAction.SELECT_ALL]: {
    key: "a",
    ctrl: true,
    action: KeyAction.SELECT_ALL,
  },
  [KeyAction.DESELECT_ALL]: { key: "Escape", action: KeyAction.DESELECT_ALL },
  [KeyAction.DELETE_SELECTED]: {
    key: "Delete",
    action: KeyAction.DELETE_SELECTED,
  },
  [KeyAction.MOVE_LEFT]: { key: "ArrowLeft", action: KeyAction.MOVE_LEFT },
  [KeyAction.MOVE_RIGHT]: { key: "ArrowRight", action: KeyAction.MOVE_RIGHT },
  [KeyAction.MOVE_UP]: { key: "ArrowUp", action: KeyAction.MOVE_UP },
  [KeyAction.MOVE_DOWN]: { key: "ArrowDown", action: KeyAction.MOVE_DOWN },
  [KeyAction.MOVE_LEFT_LARGE]: {
    key: "ArrowLeft",
    shift: true,
    action: KeyAction.MOVE_LEFT_LARGE,
  },
  [KeyAction.MOVE_RIGHT_LARGE]: {
    key: "ArrowRight",
    shift: true,
    action: KeyAction.MOVE_RIGHT_LARGE,
  },
  [KeyAction.MOVE_UP_LARGE]: {
    key: "ArrowUp",
    shift: true,
    action: KeyAction.MOVE_UP_LARGE,
  },
  [KeyAction.MOVE_DOWN_LARGE]: {
    key: "ArrowDown",
    shift: true,
    action: KeyAction.MOVE_DOWN_LARGE,
  },
  [KeyAction.TOGGLE_SIDEBAR]: {
    key: "b",
    ctrl: true,
    action: KeyAction.TOGGLE_SIDEBAR,
  },
};

interface KeybindState {
  keybinds: Record<string, Keybind>;
}

const initialState: KeybindState = {
  keybinds: defaultKeybinds,
};

const keybindSlice = createSlice({
  name: "keybinds",
  initialState,
  reducers: {
    updateKeybind: (
      state,
      action: PayloadAction<{ actionName: string; keybind: Keybind }>
    ) => {
      state.keybinds[action.payload.actionName] = action.payload.keybind;
    },
    resetKeybinds: (state) => {
      state.keybinds = defaultKeybinds;
    },
  },
});

export const { updateKeybind, resetKeybinds } = keybindSlice.actions;
export default keybindSlice.reducer;
