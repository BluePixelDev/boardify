import BaseNode from "../base-node/BaseNode";
import { GraphNode } from "../types/nodeTypes";

export type ImageNodeData = {
    src: string;
}

export default function ({ node }: { node: GraphNode }) {

    return (
        <BaseNode nodeId={node.id} aspectRatio={1}>
            <div className="outline outline-1 bg-gray-500 w-full h-full">
                <img
                    src={node.data.src}
                    className="w-full h-full object-contain"
                />
            </div>
        </BaseNode>
    );
}