import "./imageNode.styles.css";
import React from "react";
import { ImageNodeData } from "../types";
import BoardNode from "@/features/board/nodes/BoardNode";
import { NodeRendererProps } from "@/features/board/nodes";
import { useNode } from "@/features/board/nodes/hooks/useNode";

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

const ImageNode = ({ nodeId }: NodeRendererProps) => {
  const node = useNode<ImageNodeData>(nodeId);
  if (!node?.data) {
    return null;
  }

  const { width, height } = node.size;
  return (
    <BoardNode
      nodeId={nodeId}
      aspectRatio={width / height}
      className="image-node"
    >
      <OptimizedImage src={node?.data.imageUrl ?? "/fallback-image.png"} />
    </BoardNode>
  );
};

export default ImageNode;
