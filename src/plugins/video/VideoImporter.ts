import { addNode } from "@/redux/nodes/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";
import { IImporter } from "@/features/importing/IImporter";

export class VideoImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const videoUrl = URL.createObjectURL(file);
        const video = document.createElement('video') as HTMLVideoElement;

        video.onloadedmetadata = () => {
            const newNode = createNode({
                type: "video",
                position: {
                    x: 0,
                    y: 0,
                },
                size: {
                    width: video.videoWidth,
                    height: video.videoHeight,
                },
                aspect: video.videoWidth / video.videoHeight,
                data: {
                    src: videoUrl,
                    alt: file.name,
                    type: file.type
                }
            })
            dispatch(addNode(newNode));
        }
        video.src = videoUrl;
    }

    getSupportedFormats(): string[] {
        return ['mp4', 'webm', 'ogg']
    }
}