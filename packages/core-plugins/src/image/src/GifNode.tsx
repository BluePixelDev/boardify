import "./imageNode.styles.css";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NodeRendererProps, sdk } from "@boardify/sdk";
import { ImageNodeData } from "./types";

const OptimizedImage = React.memo(({ src }: { src: string }) => (
  <img
    src={src}
    loading="lazy"
    className="gif-node__image"
    alt={"GIF node image"}
    onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
  />
));
OptimizedImage.displayName = "OptimizedImage";

export const GIFNode = ({ nodeId }: NodeRendererProps) => {
  const { node } = sdk.hooks.useNode<ImageNodeData>(nodeId);
  if (!node?.data) {
    return null;
  }
  if (node.data.type !== "gif") {
    return null;
  }

  const { imageUrl, isPlaying } = node.data;
  const [firstFrame, setFirstFrame] = useState<string | null>(null);

  const toggleIsPlaying = () => {
    sdk.services.nodeService.updateNode(nodeId, {
      data: {
        ...node.data,
        isPlaying: !isPlaying,
      },
    });
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0, img.width, img.height);

        const firstFrameData = canvas.toDataURL("image/png");
        setFirstFrame(firstFrameData);
      }
    };
  }, [imageUrl]);

  const imageSrc = isPlaying ? imageUrl : (firstFrame ?? "/fallback-image.png");
  const icon = isPlaying ? "mdi:pause" : "mdi:play";
  const aspectRatio = node.size.width / node.size.height;
  const BoardNode = sdk.components.BoardNode;
  if (!node?.data || !BoardNode) {
    return null;
  }

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
};
