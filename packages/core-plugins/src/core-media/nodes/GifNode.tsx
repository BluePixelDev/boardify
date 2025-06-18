import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NodeRendererProps, WithApp } from "@boardify/sdk";
import "./imageNode.styles.css";

const OptimizedImage = React.memo(({ src }: { src: string }) => (
  <img
    src={src}
    loading="lazy"
    className="gif-node__image"
    alt="GIF node image"
    onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
  />
));
OptimizedImage.displayName = "OptimizedImage";

export function GIFNode({ nodeId, app }: WithApp<NodeRendererProps>) {
  const { hooks, components, nodeService } = app;
  const { node } = hooks.useNode(nodeId);

  if (!node?.data || node.data.type !== "gif") return null;

  const { imageUrl, isPlaying } = node.data;
  const [firstFrame, setFirstFrame] = useState<string | null>(null);
  const BoardNode = components.BoardNode;

  // Extract first frame from GIF once on image load
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      setFirstFrame(canvas.toDataURL("image/png"));
    };
  }, [imageUrl]);

  const toggleIsPlaying = () => {
    nodeService.updateNode(nodeId, {
      data: {
        ...node.data,
        isPlaying: !isPlaying,
      },
    });
  };

  const imageSrc = isPlaying ? imageUrl : (firstFrame ?? "/fallback-image.png");
  const icon = isPlaying ? "mdi:pause" : "mdi:play";
  const aspectRatio = node.size.width / node.size.height;

  return (
    <BoardNode nodeId={node.id} aspectRatio={aspectRatio} className="gif-node">
      <OptimizedImage src={imageSrc} />
      <button
        className="gif-node__control-button no-drag"
        onClick={toggleIsPlaying}
        aria-label={isPlaying ? "Pause GIF" : "Play GIF"}
      >
        <Icon icon={icon} className="gif-node__control-icon" />
      </button>
    </BoardNode>
  );
}
