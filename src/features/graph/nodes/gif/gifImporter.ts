import { addNode } from "@/redux/nodes/nodesSlice";
import { createNode } from "@/utils/nodeUtils";
import { IImporter, ImportEvent } from "@/features/importing/IImporter";

export class GIFImporter extends IImporter {
    private type: string

    constructor(type: string) {
        super()
        this.type = type
    }

    importData(event: ImportEvent): void {
        const gifUrl = URL.createObjectURL(event.file);
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
            event.dispatch(addNode(newNode));
        }
        img.src = gifUrl;
    }

    getSupportedFormats(): string[] {
        return ['gif']
    }
}