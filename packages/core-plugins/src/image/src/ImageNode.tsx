import React from "react";
import "./imageNode.styles.css";
import { ImageNodeData } from "./types";
import { sdk } from "@boardify/sdk";

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

type ImageNodeProps = {
  nodeId: string;
};

export function ImageNode({ nodeId }: ImageNodeProps) {
  const { node } = sdk.hooks.useNode<ImageNodeData>(nodeId);
  const BoardNode = sdk.components.BoardNode;

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
}
