import './audioNode.style.css'
import { GraphNode } from "@/features/graph/graphview";
import React from "react";
import { type NodeRenderer } from "../../renderer/rendererRegistry";

type AudioNodeData = {
    name: string;
    src: string;
    type: string;
};

const OptimizedAudio = React.memo(({ src, type }: { src: string; type: string }) => (
    <audio controls className='audio-node__audio'>
        <source src={src} type={type} />
    </audio>
));

const AudioNode: NodeRenderer<AudioNodeData> = ({ node }) => {
    const { src, type, name } = node.data;

    return (
        <GraphNode
            nodeId={node.id}
            className="audio-node"
            resizable={false}
        >
            <div className="audio-node__label">{name || 'Audio File'}
                <OptimizedAudio src={src ?? "/fallback-audio.png"} type={type} />
            </div>
        </GraphNode>
    );
}

export default AudioNode;
