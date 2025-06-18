import imageManifest from "./core-media/manifest.json";
import imagePlugin from "./core-media/index";

export const corePluginRegistry = {
  image: {
    manifest: imageManifest,
    plugin: imagePlugin,
  },
};
