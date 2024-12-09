import { useEffect } from "react";
import { useNodeManager } from "./NodeManagerContext";
import { nodeRendererManager } from "@/scripts/NodeRendererRegistry";
import NoteNode from "../nodes/NoteNode";
import ImageNode, { ImageNodeData } from "../nodes/ImageNode";
import { NoteData } from "../board/nodes/NoteNode";

export default function NodeRenderer() {
    const { nodes, createNode } = useNodeManager()

    useEffect(() => {
        // Register renderers for different node types
        nodeRendererManager.register('note', NoteNode); // Register a note renderer

        // Create a sample node
        createNode<NoteData>({
            type: "note",
            data: {
                text: "Joey!"
            },
        });


        // Register renderers for different node types
        nodeRendererManager.register('image', ImageNode); // Register a note renderer

        // Create a sample node
        createNode<ImageNodeData>({
            type: "image",
            data: {
                "src": "./vite.svg"
            }
        });
    }, [createNode]);

    return (
        <div>
            {nodes.map((node, index) => {
                return (
                    <div key={index}>
                        {nodeRendererManager.getRenderer(node.type)({ node })}
                    </div>
                )
            })}
        </div>
    )
}