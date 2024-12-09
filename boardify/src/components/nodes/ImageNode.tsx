import GraphNode from "@/components/graph/ViewNode";
import { NodeData } from "@/components/node-system/NodeManagerContext";

export type ImageNodeData = {
    src: string;
}

export default function ImageNode({ node }: { node: NodeData<ImageNodeData> }) {
    return (
        <GraphNode id={node.id} position={node.position} size={node.size}>
            <div className="outline outline-1 bg-gray-500 w-full h-full">
                <img src={node.data.src} className="w-full h-full" />
            </div>
        </GraphNode>
    )
}