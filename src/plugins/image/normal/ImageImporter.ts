import { IImporter, ImportEvent } from "@/features/importing";
import { createNodeFromImportEvent } from "@/utils/nodeUtils";
import { getFileFormat } from "@/utils";
import { ImageNodeData } from "../types";
import { addNode } from "@/features/board";

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "bmp", "tiff"];
export class ImageImporter implements IImporter {
  async canHandle(_file: File, content: ArrayBuffer): Promise<boolean> {
    const format = await getFileFormat(content);

    if (!format) {
      return false;
    }

    if (IMAGE_FORMATS.includes(format)) {
      return true;
    }

    return false;
  }

  async importData(event: ImportEvent): Promise<void> {
    const imageUrl = URL.createObjectURL(event.file);
    const img = new Image();

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = imageUrl;
    });

    const nodeSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
    const newNode = createNodeFromImportEvent<ImageNodeData>(event, nodeSize, {
      type: "image",
      data: {
        type: "image",
        imageUrl: imageUrl,
      },
    });

    event.dispatch(addNode(newNode));
  }
}
