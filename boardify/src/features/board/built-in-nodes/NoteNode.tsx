import GraphNode from "@/features/board/base-node/BaseNode";
import { NodeData } from "../node-system/NodeLogic";

export type NoteNodeData = {
    text: string;
}

export default function NoteNode({ node }: { node: NodeData<NoteNodeData> }) {
    
    return (
        <GraphNode initialPosition={node.position} initalSize={node.size}>
            <h1>
                {node.data.text}
            </h1>
        </GraphNode>
    )
}