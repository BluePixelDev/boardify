import "./imageNode.styles.css";
import { GraphNode } from "@/features/graph/graphview";
import React from "react";
import { ImageNodeData } from "../types";
import { GraphNodeProps } from "@/features/graph";

const OptimizedImage = React.memo(({ src }: { src: string }) => (
  <img
    src={src}
    loading="lazy"
    className="image-node__image"
    alt={"Image node"}
    onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
  />
));
OptimizedImage.displayName = "OptimizedImage";

const ImageNode = ({ node }: GraphNodeProps<ImageNodeData>) => {
  const { width, height } = node.size;
  return (
    <GraphNode
      nodeId={node.id}
      aspectRatio={width / height}
      className="image-node"
    >
      <OptimizedImage src={node?.data.imageUrl ?? "/fallback-image.png"} />
    </GraphNode>
  );
};

export default ImageNode;
