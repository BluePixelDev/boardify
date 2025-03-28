import { importerRegistry } from "@/features/importer";
import { rendererRegistry } from "../../renderer";
import { ImageNodeRenderer } from "./ImageNodeRenderer";
import { ImageImporter } from "./ImageImporter";

export const nodeDefinition = {
    type: "image",
    renderer: new ImageNodeRenderer(),
    importer: new ImageImporter(),
};

rendererRegistry.registerRenderer(nodeDefinition.type, nodeDefinition.renderer);
importerRegistry.registerImporter(nodeDefinition.importer);