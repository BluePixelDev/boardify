import { importerRegistry } from "@/features/importer/ImporterRegistry";
import { rendererRegistry } from "@/features/graph/renderer/rendererRegistry";

import NoteNode from "@/features/graph/nodes/NoteNode";
import ImageNode from "@/features/graph/nodes/ImageNode";
import { ImageImporter } from "@/features/importer/ImageImporter";
import { TextImporter } from "@/features/importer/TextImporter";

//Importer
importerRegistry.registerImporter(new ImageImporter())
importerRegistry.registerImporter(new TextImporter())

// Renderers
rendererRegistry.register("note", NoteNode)
rendererRegistry.register("image", ImageNode)

