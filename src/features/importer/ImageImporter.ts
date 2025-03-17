import { IImporter } from "./IImporter";
import { GraphNodeData } from "../graphview/types";
import { v4 as uuidv4 } from 'uuid';
import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";

export class ImageImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const newNode: GraphNodeData = {
                id: uuidv4(),
                type: "image",
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
                    alt: file.name
                }
            }
            dispatch(addNode(newNode));
        }
        img.src = imageUrl;
    }

    getSupportedFormats(): string[] {
        return ['png', 'jpeg', 'jpg', 'svg', 'webp']
    }
}