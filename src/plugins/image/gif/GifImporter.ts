import { IImporter, ImportEvent } from "@/features/importing";
import { createNodeFromImportEvent } from "@/utils/nodeUtils";
import { ImageNodeData } from "../types";
import { getFileFormat } from "@/utils";
import { addNode } from "@/features/board";

export class GIFImporter implements IImporter {
  async canHandle(_file: File, buffer: ArrayBuffer): Promise<boolean> {
    const format = await getFileFormat(buffer);
    return format === "gif";
  }

  async importData(event: ImportEvent): Promise<void> {
    const gifUrl = URL.createObjectURL(event.file);
    const img = new Image();

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = gifUrl;
    });

    const nodeSize = {
      width: img.width,
      height: img.height,
    };

    const newNode = createNodeFromImportEvent<ImageNodeData>(event, nodeSize, {
      type: "image",
      data: { type: "gif", imageUrl: gifUrl, isPlaying: false },
    });

    event.dispatch(addNode(newNode));
  }
}
