import { ImageNodeRenderer } from "./ImageNodeRenderer";
import { ImageImporter } from "./normal/ImageImporter";
import { PluginDefinition } from "@/core/plugins";
import { GIFImporter } from "./gif/GifImporter";
import { rendererRegistry } from "@/core/renderers";
import { importerRegistry } from "@/core/importers";

let renderer: ImageNodeRenderer;
let importer: ImageImporter;
let gifImporter: GIFImporter;

const plugin: PluginDefinition = {
  id: "core-image-plugin",
  name: "Image Plugin",
  description: "A plugin that adds image support to the application.",
  version: "1.0.0",
  onRegister: () => {
    renderer = new ImageNodeRenderer();
    importer = new ImageImporter();
    gifImporter = new GIFImporter();
    rendererRegistry.registerRenderer("image", renderer);
    importerRegistry.registerImporter(importer);
    importerRegistry.registerImporter(gifImporter);
  },
  onUnload: () => {
    rendererRegistry.removeRenderer("image");
    importerRegistry.unregisterImporter(importer);
  },
};

export default plugin;
