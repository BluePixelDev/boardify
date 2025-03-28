import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";
import { IImporter } from "@/features/importer/IImporter";

export class ImageImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const newNode = createNode({
                type: "image",
                position: { 
                    x: 0, 
                    y: 0,
                },
                size: {
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
                data: {
                    imageUrl: imageUrl,
                }
            })
            dispatch(addNode(newNode));
        }
        img.src = imageUrl;
    }

    getSupportedFormats(): string[] {
        return ['png', 'jpeg', 'jpg', 'svg', 'webp']
    }
}