import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PluginManifest } from "../types";

interface PluginState {
  installed: Record<string, PluginManifest>;
  enabled: Record<string, boolean>;
  settings: Record<string, unknown>;
}

const initialState: PluginState = {
  installed: {},
  enabled: {},
  settings: {},
};

const pluginSlice = createSlice({
  name: "plugins",
  initialState,
  reducers: {
    registerPlugin(
      state,
      action: PayloadAction<{ id: string; manifest: PluginManifest }>
    ) {
      const { id, manifest } = action.payload;
      state.installed[id] = manifest;
      if (!(id in state.enabled)) {
        state.enabled[id] = true;
      }
    },
    setEnabled(state, action: PayloadAction<{ id: string; enabled: boolean }>) {
      state.enabled[action.payload.id] = action.payload.enabled;
    },
    updatePluginSettings(
      state,
      action: PayloadAction<{ id: string; settings: unknown }>
    ) {
      state.settings[action.payload.id] = action.payload.settings;
    },
  },
});

export const { registerPlugin, setEnabled, updatePluginSettings } =
  pluginSlice.actions;
export default pluginSlice.reducer;
