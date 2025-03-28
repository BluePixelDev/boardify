import { importerRegistry } from "@/features/importer/ImporterRegistry";
import { rendererRegistry } from "@/features/graph/renderer/RendererRegistry";

import NoteNode from "@/features/graph/nodes/noteNode/NoteNode";
import ImageNode from "@/features/graph/nodes/imageNode/ImageNode";
import { GIFImporter } from "@/features/graph/nodes/gifNode/gifImporter";
import GIFNode from "@/features/graph/nodes/gifNode/GifNode";
import { ImageImporter } from "@/features/graph/nodes/imageNode/ImageImporter";
import { TextImporter } from "@/features/graph/nodes/noteNode/TextImporter";
import VideoNode from "@/features/graph/nodes/videoNode/VideoNode";
import { VideoImporter } from "@/features/graph/nodes/videoNode/VideoImporter";
import AudioNode from "@/features/graph/nodes/audioNode/AudioNode";
import { AudioImporter } from "@/features/graph/nodes/audioNode/AudioImporter";

//Importer
importerRegistry.registerImporter(new ImageImporter())
importerRegistry.registerImporter(new TextImporter())
importerRegistry.registerImporter(new GIFImporter())
importerRegistry.registerImporter(new VideoImporter())
importerRegistry.registerImporter(new AudioImporter())

// Renderers
rendererRegistry.register("note", NoteNode)
rendererRegistry.register("image", ImageNode)
rendererRegistry.register("gif", GIFNode)
rendererRegistry.register("video", VideoNode)
rendererRegistry.register("audio", AudioNode)

