import { addNode } from "@/redux/nodesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { createNode } from "@/utils/nodeUtils";
import { IImporter } from "@/features/importing/IImporter";

export class TextImporter extends IImporter {
    importData(file: File, dispatch: Dispatch): void {
        const reader = new FileReader();

        reader.onload = (event) => {
            const contents = event.target?.result as string;
            const newNode = createNode({
                type: "note",
                position: { 
                    x: 0, 
                    y: 0,
                },
                size: {
                    width: 100,
                    height: 200,
                },
                data: {
                    text: contents,
                }
            })
            dispatch(addNode(newNode));
        }

        reader.readAsText(file);
    }

    getSupportedFormats(): string[] {
        return ['txt']
    }
}