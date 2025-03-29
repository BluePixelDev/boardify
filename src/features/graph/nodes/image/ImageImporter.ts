import { addNode } from "@/redux/nodes/nodesSlice";
import { createNode } from "@/utils/nodeUtils";
import { IImporter, ImportEvent } from "@/features/importing/IImporter";

export class ImageImporter extends IImporter {
    importData(event: ImportEvent): void {
        const imageUrl = URL.createObjectURL(event.file);
        const img = new Image();

        img.onload = () => {
            const newNode = createNode({
                type: "image",
                position: { 
                    ...event.position,
                },
                size: {
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
                data: {
                    imageUrl: imageUrl,
                }
            })
            event.dispatch(addNode(newNode))
        }
        img.src = imageUrl;
    }

    getSupportedFormats(): string[] {
        return ['png', 'jpeg', 'jpg', 'svg', 'webp']
    }
}