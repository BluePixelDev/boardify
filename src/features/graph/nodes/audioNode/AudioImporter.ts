import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";
import { IImporter } from "@/features/importer/IImporter";

export class AudioImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const audioUrl = URL.createObjectURL(file);
        const audio = document.createElement('audio') as HTMLAudioElement;

        audio.onloadedmetadata = () => {
            const newNode = createNode({
                type: "audio",
                position: {
                    x: 0,
                    y: 0,
                },
                size: {
                    width: 200, 
                    height: 50,
                },
                data: {
                    name: file.name,
                    src: audioUrl,
                    type: file.type
                }
            })
            dispatch(addNode(newNode));
        }
        audio.src = audioUrl;
    }

    getSupportedFormats(): string[] {
        return ['mp3', 'ogg', 'wav', 'aac', 'flac'];
    }
}