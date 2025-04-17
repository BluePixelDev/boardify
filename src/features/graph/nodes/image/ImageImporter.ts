import { IImporter, ImportEvent, ImportResult } from "@/features/importing"
import { createNode } from "@/utils/nodeUtils"
import { addNode, selectCurrentLayer } from "../../store"
import { getImageFormatFromHeaders } from "@/utils"

export class ImageImporter implements IImporter {
    canHandle(_file: File, content: ArrayBuffer): boolean {
        const format = getImageFormatFromHeaders(content)

        if (format == "gif")
            return false

        return format !== null  // Return true if a valid image format is detected
    }

    async importData(event: ImportEvent): Promise<ImportResult> {
        try {
            const imageUrl = URL.createObjectURL(event.file)
            const img = new Image()

            // Wait for the image to load asynchronously
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve()
                img.onerror = () => reject(new Error('Failed to load image.'))
                img.src = imageUrl
            })

            const newNode = createNode({
                type: "image",
                position: event.position,
                size: {
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
                data: {
                    imageUrl: imageUrl,
                },
                layerId: selectCurrentLayer(event.getState())?.id ?? "",
            })

            event.dispatch(addNode(newNode))

            return { success: true, message: 'Image imported successfully.' }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            return { success: false, message: `Error importing image: ${message}` }
        }
    }
}