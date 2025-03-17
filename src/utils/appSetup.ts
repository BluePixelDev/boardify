import { importerRegistry } from "@/features/importer/ImporterRegistry";
import { rendererRegistry } from "@/features/nodes/renderer/rendererRegistry";

import NoteNode from "@/features/nodes/built-in/NoteNode";
import ImageNode from "@/features/nodes/built-in/ImageNode";
import { ImageImporter } from "@/features/importer/ImageImporter";

//Importer
importerRegistry.registerImporter(new ImageImporter())

// Renderers
rendererRegistry.register("note", NoteNode)
rendererRegistry.register("image", ImageNode)

