import './imageNode.styles.css'
import { GraphNode } from "@/features/graph/graphview";
import React from "react";
import { type NodeRenderer } from "../../renderer/rendererRegistry";


type ImageNodeData = {
    src: string;
}

const OptimizedImage = React.memo(({ src, alt }: { src: string; alt?: string }) => (
    <img
        src={src}
        loading="lazy"
        className="image-node__image"
        alt={alt ?? "Image node"}
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
    />
));


const ImageNode: NodeRenderer<ImageNodeData> = ({ node }) => {

    return (
        <GraphNode nodeId={node.id} aspectRatio={node.aspect ?? 1} className="image-node">
            <OptimizedImage src={node.data.src ?? "/fallback-image.png"} />
        </GraphNode>
    );
}

export default ImageNode;