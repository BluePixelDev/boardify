import "./GifNode.styles.css";
import { GraphNode } from "@/features/graph/graphview";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GraphNodeProps, updateNode } from "@/features/graph";
import { ImageNodeData } from "../types";

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

const GIFNode = ({ node }: GraphNodeProps<ImageNodeData>) => {
  if (node.data.type !== "gif") {
    return null;
  }

  const { imageUrl, isPlaying } = node.data;
  const [firstFrame, setFirstFrame] = useState<string | null>(null);

  const dispatch = useDispatch();
  const toggleIsPlaying = () => {
    dispatch(
      updateNode({
        id: node.id,
        changes: {
          data: {
            ...node.data,
            isPlaying: !isPlaying,
          },
        },
      })
    );
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

  return (
    <GraphNode nodeId={node.id} aspectRatio={aspectRatio} className="gif-node">
      <OptimizedImage src={imageSrc} />
      <button
        className="gif-node__control-button no-drag"
        onClick={toggleIsPlaying}
        aria-label={isPlaying ? "Pause GIF" : "Play GIF"}
      >
        <Icon icon={icon} className="gif-node__control-icon" />
      </button>
    </GraphNode>
  );
};

export default GIFNode;
