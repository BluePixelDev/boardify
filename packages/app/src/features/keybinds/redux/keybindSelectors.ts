import { RootState } from "@/redux";

export const selectKeybinds = (state: RootState) => state.keybinds.keybinds;
