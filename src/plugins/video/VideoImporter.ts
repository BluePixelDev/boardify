import { addNode } from "@/features/board";
import { IImporter, ImportEvent, ImportResult } from "@/features/importing";
import { getFileFormat } from "@/utils";
import { createNodeFromImportEvent } from "@/utils/nodeUtils";
import { VideoNodeData } from "./types";

const VIDEO_FORMATS = ["mp4", "webm", "ogg"];
export class VideoImporter implements IImporter {
  async canHandle(_file: File, content: ArrayBuffer): Promise<boolean> {
    const fileType = await getFileFormat(content);
    if (!fileType) {
      return false;
    }

    return Promise.resolve(VIDEO_FORMATS.includes(fileType));
  }

  async importData(event: ImportEvent): Promise<ImportResult> {
    try {
      const videoUrl = URL.createObjectURL(event.file);
      const video = document.createElement("video") as HTMLVideoElement;
      video.src = videoUrl;

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () =>
          reject(new Error("Failed to load video metadata"));
      });

      const file = event.file;
      const size = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      video.onloadedmetadata = () => {
        const newNode = createNodeFromImportEvent<VideoNodeData>(event, size, {
          type: "video",
          data: {
            src: videoUrl,
            type: file.type,
          },
        });
        event.dispatch(addNode(newNode));
      };
      video.src = videoUrl;
      console.log("Video URL: ", videoUrl);

      return { success: true, message: "Image imported successfully." };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, message: `Error importing image: ${message}` };
    }
  }
}
