import React from "react";
import "./imageNode.styles.css";
import { WithApp } from "@boardify/sdk";

const OptimizedImage = React.memo(({ src }: { src: string }) => (
  <img
    src={src}
    loading="lazy"
    className="image-node__image"
    alt="Image node"
    onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
  />
));
OptimizedImage.displayName = "OptimizedImage";

type ImageNodeProps = {
  nodeId: string;
};

export function ImageNode({ nodeId, app }: WithApp<ImageNodeProps>) {
  const { hooks, components } = app;
  const { node } = hooks.useNode(nodeId);
  const BoardNode = components.BoardNode;

  if (!node?.data) return null;

  const { width, height } = node.size;

  return (
    <BoardNode
      nodeId={nodeId}
      aspectRatio={width / height}
      className="image-node"
    >
      <OptimizedImage src={node.data.imageUrl ?? "/fallback-image.png"} />
    </BoardNode>
  );
}
