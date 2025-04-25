import { RootState } from "@/store";

export const selectKeybinds = (state: RootState) => state.keybinds.keybinds;
