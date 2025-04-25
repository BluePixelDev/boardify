import { IImporter, ImportEvent, ImportResult } from "@/features/importing";
import { createNodeFromImportEvent } from "@/utils/nodeUtils";
import { addNode } from "../../../features/graph/store";
import { ImageNodeData } from "../types";
import { getFileFormat } from "@/utils";

export class GIFImporter implements IImporter {
  async canHandle(_file: File, buffer: ArrayBuffer): Promise<boolean> {
    const format = await getFileFormat(buffer);
    return format === "gif";
  }

  async importData(event: ImportEvent): Promise<ImportResult> {
    try {
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
      const newNode = createNodeFromImportEvent<ImageNodeData>(
        event,
        nodeSize,
        {
          type: "image",
          data: { type: "gif", imageUrl: gifUrl, isPlaying: false },
        }
      );

      event.dispatch(addNode(newNode));

      return { success: true, message: "GIF imported successfully." };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, message: `Error importing GIF: ${message}` };
    }
  }
}
