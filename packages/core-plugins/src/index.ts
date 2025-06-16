import imageManifest from "./image/manifest.json";
import imagePlugin from "./image/index";

export const corePluginRegistry = {
  image: {
    manifest: imageManifest,
    plugin: imagePlugin,
  },
};
