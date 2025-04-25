import { PluginDefinition } from "@/features/plugins";
import { VideoNodeRenderer } from "./VideoNodeRenderer";
import { VideoImporter } from "./VideoImporter";
import { rendererRegistry } from "@/features/graph";
import { importerRegistry } from "@/features/importing";

let renderer: VideoNodeRenderer;
let importer: VideoImporter;

const plugin: PluginDefinition = {
  name: "Video Plugin",
  id: "core-video-plugin",
  description: "A plugin that adds video support to the application.",
  version: "1.0.0",
  onRegister: () => {
    renderer = new VideoNodeRenderer();
    importer = new VideoImporter();
    rendererRegistry.registerRenderer("video", renderer);
    importerRegistry.registerImporter(importer);
  },
  onUnload: () => {
    rendererRegistry.removeRenderer("video");
    importerRegistry.unregisterImporter(importer);
  },
};

export default plugin;
