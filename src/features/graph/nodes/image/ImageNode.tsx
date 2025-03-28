import './imageNode.styles.css'
import { GraphNode } from "@/features/graph/graphview"
import React from "react"
import { GraphNodeProps } from '../node.types'
import { ImageNodeData } from './imageNode.types'

const OptimizedImage = React.memo(({ src }: { src: string }) => (
    <img
        src={src}
        loading="lazy"
        className="image-node__image"
        alt={"Image node"}
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
    />
))

const ImageNode = ({ node }: GraphNodeProps<ImageNodeData>) => {
    const { width, height } = node.size
    return (
        <GraphNode nodeId={node.id} aspectRatio={width / height} className="image-node">
            <OptimizedImage src={node?.data.imageUrl ?? "/fallback-image.png"} />
        </GraphNode>
    )
}

export default ImageNode