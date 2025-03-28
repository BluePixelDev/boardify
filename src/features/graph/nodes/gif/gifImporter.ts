import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";
import { IImporter } from "@/features/importer/IImporter";

export class GIFImporter extends IImporter {
    private type: string

    constructor(type: string){
        super()
        this.type = type
    }

    importData(file: File, dispatch: Dispatch): void {
        const gifUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const newNode = createNode({
                type: this.type,
                position: { 
                    x: 0, 
                    y: 0,
                },
                size: {
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
                data: {
                    gifURL: gifUrl,
                    isPlaying: false
                }
            })
            dispatch(addNode(newNode));
        }
        img.src = gifUrl;
    }

    getSupportedFormats(): string[] {
        return ['gif']
    }
}