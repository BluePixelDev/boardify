import { IImporter } from "./IImporter";
import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";

export class GIFImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const newNode = createNode({
                type: "gif",
                position: { 
                    x: 0, 
                    y: 0,
                },
                size: {
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
                aspect: img.naturalWidth / img.naturalHeight,
                data: {
                    src: imageUrl,
                }
            })
            dispatch(addNode(newNode));
        }
        img.src = imageUrl;
    }

    getSupportedFormats(): string[] {
        return ['gif']
    }
}