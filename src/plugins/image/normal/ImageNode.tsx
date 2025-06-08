import "./imageNode.styles.css";
import React from "react";
import { ImageNodeData } from "../types";
import { BoardNodeProps } from "@/features/board";
import { BoardNode } from "@/features/board/nodes";

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

const ImageNode = ({ node }: BoardNodeProps<ImageNodeData>) => {
  const { width, height } = node.size;
  return (
    <BoardNode
      nodeId={node.id}
      aspectRatio={width / height}
      className="image-node"
    >
      <OptimizedImage src={node?.data.imageUrl ?? "/fallback-image.png"} />
    </BoardNode>
  );
};

export default ImageNode;
