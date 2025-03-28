import { importerRegistry } from "@/features/importer";
import { rendererRegistry } from "../../renderer";
import { GifNodeRenderer } from "./GifNodeRenderer";
import { GIFImporter } from "./gifImporter";

const type = "image/gif"
export const nodeDefinition = {
    type,
    renderer: new GifNodeRenderer(),
    importer: new GIFImporter(type),
};

rendererRegistry.registerRenderer(nodeDefinition.type, nodeDefinition.renderer);
importerRegistry.registerImporter(nodeDefinition.importer);