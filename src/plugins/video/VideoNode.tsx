import { GraphNodeData } from '@/features/graph';
import './videoNode.style.css'
import { GraphNode } from "@/features/graph/graphview";
import { NodeRenderer } from '@/features/graph/renderer';
import React from "react";
import { VideoNodeData } from './types';

const OptimizedVideo = React.memo(({ src, type }: { src: string; type: string }) => (
    <video
        controls
        className='video-node__video'
        poster={src}
    >
        <source src={src} type={type} />
    </video>
))
OptimizedVideo.displayName = 'VideoNode';

const VideoNode: NodeRenderer<VideoNodeData> = ({ node }: { node: GraphNodeData<VideoNodeData> }) => {
    const { src, type } = node.data
    const { width, height } = node.size
    const aspect = width / height;

    return (
        <GraphNode
            nodeId={node.id}
            aspectRatio={aspect}
            className="video-node"
        >
            <OptimizedVideo src={src ?? "/fallback-image.png"} type={type} />
        </GraphNode>
    );
}

export default VideoNode;