import { IImporter, ImportEvent, ImportResult } from "@/features/importing";
import { createNode } from "@/utils/nodeUtils";
import { addNode, selectCurrentLayer } from "../../store";

export class GIFImporter implements IImporter {
    canHandle(_file: File, content: ArrayBuffer): boolean {
        const header = new Uint8Array(content.slice(0, 6));
        const headerString = String.fromCharCode(...header);
        return headerString === 'GIF89a' || headerString === 'GIF87a';
    }

    async importData(event: ImportEvent): Promise<ImportResult> {
        try {
            const { position: eventPosition } = event;
            const gifUrl = URL.createObjectURL(event.file);
            const img = new Image();

            const { transform } = event.getState().graph.graphView;
            const [scaleX, , , scaleY, translateX, translateY] = transform;
            const graphX = (eventPosition.x - translateX) / scaleX;
            const graphY = (eventPosition.y - translateY) / scaleY;

            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject(new Error('Failed to load image.'));
                img.src = gifUrl;
            });

            const newNode = createNode({
                type: 'gif',
                position: { x: graphX, y: graphY },
                size: { width: img.naturalWidth, height: img.naturalHeight },
                data: { gifURL: gifUrl, isPlaying: false },
                layerId: selectCurrentLayer(event.getState())?.id ?? "",
            });

            event.dispatch(addNode(newNode));

            return { success: true, message: 'GIF imported successfully.' };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            return { success: false, message: `Error importing GIF: ${message}` };
        }
    }
}
