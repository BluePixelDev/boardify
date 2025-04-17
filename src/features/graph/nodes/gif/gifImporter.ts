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
            const gifUrl = URL.createObjectURL(event.file);
            const img = new Image();

            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject(new Error('Failed to load image.'));
                img.src = gifUrl;
            });

            const newNode = createNode({
                type: 'gif',
                position: event.position,
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
