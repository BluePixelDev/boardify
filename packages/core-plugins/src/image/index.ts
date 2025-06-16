import { PluginDefinition, sdk } from "@boardify/sdk";
import { ImageNodeRenderer } from "./src/ImageNodeRenderer";
import { imageImporterHandler } from "./src/imageImporthandler";

const plugin: PluginDefinition = {
  attach: () => {
    sdk.services.render.registerRenderer("image", ImageNodeRenderer);
    sdk.services.import.registerImporter(imageImporterHandler);
  },
};

export default plugin;
