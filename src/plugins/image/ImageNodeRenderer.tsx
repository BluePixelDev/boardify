import { GraphNodeData } from "@/features/graph"
import ImageNode from "./normal/ImageNode"
import { ImageNodeData } from "./types"
import { IRenderer } from "@/features/graph/renderer"
import GIFNode from "./gif/GifNode"

export class ImageNodeRenderer implements IRenderer<ImageNodeData> {
    render = (node: GraphNodeData<unknown>): JSX.Element | null => {
        const nodeData = node as GraphNodeData<ImageNodeData>
        const data = nodeData.data

        if (!nodeData) return null
        if (!data || !data.imageUrl) {
            return null
        }

        switch (data.type) {
            case "gif":
                return <GIFNode node={node as GraphNodeData<ImageNodeData>} />
            case "image":
                return <ImageNode node={node as GraphNodeData<ImageNodeData>} />
            default:
                return null
        }
    }
}