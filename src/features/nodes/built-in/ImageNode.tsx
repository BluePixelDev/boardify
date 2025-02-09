import GraphNode from "../../graphview/components/node/GraphNode";
import { GraphViewNode } from "../../graphview/types";

type ImageNodeData = {
    src: string;
}

export default function ({ node }: { node: GraphViewNode<ImageNodeData> }) {

    return (
        <GraphNode nodeId={node.id} aspectRatio={1}>
            <div className="outline outline-1 bg-gray-500 w-full h-full">
                <img
                    src={node.data.src}
                    className="w-full h-full object-contain"
                />
            </div>
        </GraphNode>
    );
}