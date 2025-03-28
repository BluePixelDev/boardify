import './videoNode.style.css'
import { GraphNode } from "@/features/graph/graphview";
import React from "react";
import { type NodeRenderer } from "../../renderer/RendererRegistry";

type VideoNodeData = {
    src: string;
    type: string
}

const OptimizedVideo = React.memo(({ src, type }: { src: string; type: string }) => (
    <video
        controls
        className='video-node__video'
        poster={src}
    >
        <source src={src} type={type} />
    </video>
));

const VideoNode: NodeRenderer<VideoNodeData> = ({ node }) => {
    const { src, type } = node.data;

    return (
        <GraphNode
            nodeId={node.id}
            aspectRatio={node.aspect}
            className="video-node"
        >
            <OptimizedVideo src={src ?? "/fallback-image.png"} type={type} />
        </GraphNode>
    );
}

export default VideoNode;