import { NodeData } from "@/components/node-system/NodeLogic";
import GraphNode from "../graph/graph-node/GraphNode";

export type ImageNodeData = {
    src: string;
}

export default function ImageNode({ node }: { node: NodeData<ImageNodeData> }) {

    const aspectRatio = node.data.src ? 0.2 : 1;

    const onResize = (newSize: { width: number, height: number }) => {
        const width = newSize.width;
        const height = width / aspectRatio; // Lock the height based on width
        node.size = { width, height }; // Update node size
    };

    return (
        <GraphNode
            initialPosition={node.position}
            initalSize={node.size}
            onResize={onResize}
        >
            <div className="outline outline-1 bg-gray-500 w-full h-full">
                <img
                    src={node.data.src}
                    className="w-full h-full object-contain"
                    style={{
                        aspectRatio: `${aspectRatio}`,
                        objectFit: 'contain',
                    }}
                />
            </div>
        </GraphNode>
    );
}

// Helper to fetch the aspect ratio of the image
async function getImageAspectRatio(src: string) {
    const img = new Image();
    img.src = src;
    await new Promise((resolve) => {
        img.onload = () => resolve(null);
    });
    return img.width / img.height;
}
