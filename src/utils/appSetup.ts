import { importerRegistry } from "@/features/importer/ImporterRegistry";
import { rendererRegistry } from "@/features/graph/renderer/rendererRegistry";

import NoteNode from "@/features/graph/nodes/NoteNode";
import ImageNode from "@/features/graph/nodes/ImageNode";
import { ImageImporter } from "@/features/importer/ImageImporter";
import { TextImporter } from "@/features/importer/TextImporter";
import GIFNode from "@/features/graph/nodes/GIFNode";
import { GIFImporter } from "@/features/importer/GIFImporter";

//Importer
importerRegistry.registerImporter(new ImageImporter())
importerRegistry.registerImporter(new TextImporter())
importerRegistry.registerImporter(new GIFImporter())

// Renderers
rendererRegistry.register("note", NoteNode)
rendererRegistry.register("image", ImageNode)
rendererRegistry.register("gif", GIFNode)

