import GraphNode from "@/components/graph/graph-node/GraphNode";
import { NodeData } from "../node-system/NodeManagerContext";

export type NoteNodeData = {
    text: string;
}

export default function NoteNode({ node }: { node: NodeData<NoteNodeData> }) {
    
    return (
        <GraphNode position={node.position} size={node.size}>
            <h1>
                {node.data.text}
            </h1>
        </GraphNode>
    )
}