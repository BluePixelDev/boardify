import { GraphNode } from "../../graphview"
import { GraphNodeProps } from "../../store"

export const FallbackNode = ({ node }: GraphNodeProps<unknown>) => {
    return (
        <GraphNode nodeId={node.id} aspectRatio={1} className="fallback-node" resizable={false}>
            <h1>
                No node found!<br />
                Please check the node type and ensure the renderer is registered.
            </h1>
        </GraphNode>
    )
}