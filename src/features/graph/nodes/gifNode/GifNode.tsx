import './GifNode.styles.css'
import { GraphNode } from "@/features/graph/graphview";
import React, { useEffect, useState } from "react";
import { type NodeRenderer } from "../../renderer/rendererRegistry";
import { useDispatch } from "react-redux";
import { updateNode } from "@/redux/nodesSlice";
import { Icon } from '@iconify/react/dist/iconify.js';

type GIFNodeData = {
    src: string;
    isPlaying: boolean
}

const OptimizedImage = React.memo(({ src, alt }: { src: string; alt?: string }) => (
    <img
        src={src}
        loading="lazy"
        className="gif-node__image"
        alt={alt ?? "GIF node image"}
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
    />
));


const GIFNode: NodeRenderer<GIFNodeData> = ({ node }) => {
    const { src, isPlaying } = node.data;
    const [firstFrame, setFirstFrame] = useState<string | null>(null);

    const dispatch = useDispatch()

    const toggleIsPlaying = () => {
        dispatch(updateNode({
            id: node.id,
            data: {
                ...node.data,
                isPlaying: !isPlaying
            },
        }))
    }

    useEffect(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (context) {
                canvas.width = img.width;
                canvas.height = img.height;

                context.drawImage(img, 0, 0, img.width, img.height);

                const firstFrameData = canvas.toDataURL("image/png");
                setFirstFrame(firstFrameData);
            }
        }
    }, [src]);


    const imageSrc = isPlaying ? src : firstFrame ?? "/fallback-image.png";
    const icon = isPlaying ? "mdi:pause" : "mdi:play";

    return (
        <GraphNode
            nodeId={node.id}
            aspectRatio={node.aspect ?? 1}
            className="gif-node"
        >
            <OptimizedImage src={imageSrc} />
            <button
                className="gif-node__control-button no-drag"
                onClick={toggleIsPlaying}
                aria-label={isPlaying ? "Pause GIF" : "Play GIF"}
            >
                <Icon icon={icon} className='gif-node__control-icon'/>
            </button>
        </GraphNode>
    );
}

export default GIFNode;