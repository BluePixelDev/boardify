import { ImportEvent, sdk } from "@boardify/sdk";

const SUPPORTED_FORMATS = ["jpg", "jpeg", "png", "webp", "bmp", "tiff", "gif"];
export const imageImporterHandler = async (
  event: ImportEvent,
  accept: () => void
): Promise<void> => {
  let format: string | undefined;
  try {
    const buffer = await event.file.arrayBuffer();
    format = await sdk.utils.getFileFormat(buffer);
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

  const nodeSize = {
    width: img.naturalWidth,
    height: img.naturalHeight,
  };

  const isGif = format === "gif";

  const newNode = sdk.utils.createNodeFromImportEvent(event, nodeSize, {
    type: "image",
    data: {
      type: isGif ? "gif" : "image",
      imageUrl,
      ...(isGif && { isPlaying: false }),
    },
    aspectLocked: true,
  });

  sdk.services.nodeService.addNode(newNode);
};
