import { nodeRendererManager } from "@/features/nodes/scripts/NodeRendererRegistry";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardNode } from "./types/node-types";
import { v4 as uuidv4 } from 'uuid';

import ImageNodeRenderer from "@/features/nodes/built-in/ImageNode";
import { addNode } from "./redux/nodesSlice";

export default function () {

    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.graphNodes.nodes);

    useEffect(() => {
        if (nodes.length > 0) return;
        nodeRendererManager.register('image', ImageNodeRenderer);
        
        const newNode: BoardNode = {
            id: uuidv4(),
            type: "image",
            position: { x: 0, y: 450 },
            size: { width: 200, height: 200 },
            data: {
                src: "./tauri.svg"
            }
        };
        dispatch(addNode(newNode));
        
        const newNode1: BoardNode = {
            id: uuidv4(),
            type: "image",
            position: { x: 500, y: 0 },
            size: { width: 200, height: 200 },
            data: {
                src: "./vite.svg"
            }
        };
        dispatch(addNode(newNode1));
        
        const newNode2: BoardNode = {
            id: uuidv4(),
            type: "image",
            position: { x: -500, y: 0 },
            size: { width: 200, height: 200 },
            data: {
                src: "./dog.jpg"
            }
        };
        dispatch(addNode(newNode2));
    }, [dispatch]);

    return (
        <>
            {nodes.map((node) => {
                const Renderer = nodeRendererManager.getRenderer(node.type); // Get the appropriate renderer for the node type

                return (
                    <div key={node.id}>
                        {/* Render the node using its corresponding renderer */}
                        {Renderer ? <Renderer node={node} /> : <div>Unknown node type: {node.type}</div>}
                    </div>
                );
            })}
        </>
    );
}