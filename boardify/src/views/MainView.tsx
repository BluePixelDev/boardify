import GraphView from "@/components/graph/GraphView";
import NodeManagerContext from "@/components/node-system/NodeManagerContext";
import NodeRenderer from "@/components/node-system/NodeRenderer";

export default function MainView() {
    return (
        <NodeManagerContext>
            <GraphView graph={{
                maxZoom: 5,
                minZoom: 0.5
            }}>
                <NodeRenderer />
            </GraphView>
        </NodeManagerContext>
    )
}