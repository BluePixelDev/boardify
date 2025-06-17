import { ImportEvent, App, NodeSize, NodeData } from "@boardify/sdk";

const SUPPORTED_FORMATS = ["jpg", "jpeg", "png", "webp", "bmp", "tiff", "gif"];

export function createImageImporterHandler(app: App) {
  return async (event: ImportEvent, accept: () => void): Promise<void> => {
    let format: string | undefined;

    try {
      const buffer = await event.file.arrayBuffer();
      format = await app.utils.getFileFormat(buffer);
    } catch (e) {
      console.error("Failed to get file format", e);
      return;
    }

    if (!format || !SUPPORTED_FORMATS.includes(format)) {
      return;
    }

    accept();

    const imageUrl = URL.createObjectURL(event.file);
    const img = new Image();

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = imageUrl;
    });

    const nodeSize: NodeSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    const isGif = format === "gif";

    const newNode: NodeData<unknown> =
      app.nodeService.createNodeFromImportEvent(event, nodeSize, {
        type: "image",
        data: {
          type: isGif ? "gif" : "image",
          imageUrl,
          ...(isGif && { isPlaying: false }),
        },
        aspectLocked: true,
      });

    app.nodeService.addNode(newNode);
  };
}
