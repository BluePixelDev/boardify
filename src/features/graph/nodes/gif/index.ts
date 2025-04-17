import { importerRegistry } from "@/features/importing";
import { rendererRegistry } from "../../renderer";
import { GifNodeRenderer } from "./GifNodeRenderer";
import { GIFImporter } from "./gifImporter";

const type = "gif"
export const nodeDefinition = {
    type,
    renderer: new GifNodeRenderer(),
    importer: new GIFImporter(),
};

rendererRegistry.registerRenderer(nodeDefinition.type, nodeDefinition.renderer);
importerRegistry.registerImporter(nodeDefinition.importer);