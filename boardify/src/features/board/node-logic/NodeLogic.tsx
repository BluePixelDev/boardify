import { nodeRendererManager } from "@/features/board/scripts/NodeRendererRegistry";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GraphNode } from "../types/nodeTypes";
import { v4 as uuidv4 } from 'uuid';
import { addNode } from "../redux/nodesSlice";
import ImageNodeRenderer from "../built-in-nodes/ImageNodeRenderer";

export default function () {

    const dispatch = useDispatch();
    const nodes = useSelector((state: RootState) => state.graphNodes.nodes);

    useEffect(() => {
        // Register renderers for different node types
        nodeRendererManager.register('image', ImageNodeRenderer); // Register a note renderer

        const newNode: GraphNode = {
            id: uuidv4(),
            type: "image",
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 },
            data: {
                src: "./vite.svg"
            }
        };

        dispatch(addNode(newNode));
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