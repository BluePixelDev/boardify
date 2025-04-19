import { IImporter, ImportEvent, ImportResult } from "@/features/importing"
import { createNodeFromImportEvent } from "@/utils/nodeUtils"
import { addNode } from "../../store"
import { getImageFormatFromHeaders } from "@/utils"
import { ImageNodeData } from "./imageNode.types"

export class ImageImporter implements IImporter {
    canHandle(_file: File, content: ArrayBuffer): boolean {
        const format = getImageFormatFromHeaders(content)

        if (format == "gif")
            return false

        return format !== null
    }

    async importData(event: ImportEvent): Promise<ImportResult> {
        try {
            const imageUrl = URL.createObjectURL(event.file)
            const img = new Image()

            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve()
                img.onerror = () => reject(new Error('Failed to load image.'))
                img.src = imageUrl
            })

            const nodeSize = {
                width: img.naturalWidth,
                height: img.naturalHeight
            }
            const newNode = createNodeFromImportEvent<ImageNodeData>(event, nodeSize, {
                type: 'image',
                data: {
                    imageUrl: imageUrl,
                },
            })

            event.dispatch(addNode(newNode))

            return { success: true, message: 'Image imported successfully.' }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            return { success: false, message: `Error importing image: ${message}` }
        }
    }
}