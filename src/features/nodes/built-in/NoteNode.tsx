import GraphNode from "../../graphview/components/node/GraphNode";
import { GraphViewNode } from "../../graphview/types";

interface NoteNodeData {
    text: string;
}

export default function NoteNode({ node }: { node: GraphViewNode<NoteNodeData> }) {
    return (
        <GraphNode nodeId={node.id}>
            <h1>{node.data.text}</h1>
        </GraphNode>
    )
}