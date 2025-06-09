import { BoardNodeData } from "@/features/board";
import "./videoNode.style.css";
import { NodeRenderer } from "@/features/board/renderer";
import React from "react";
import { VideoNodeData } from "./types";
import { BoardNode } from "@/features/board/ui/node";

const OptimizedVideo = React.memo(
  ({ src, type }: { src: string; type: string }) => (
    <video controls className="video-node__video" poster={src}>
      <source src={src} type={type} />
    </video>
  )
);
OptimizedVideo.displayName = "VideoNode";

const VideoNode: NodeRenderer<VideoNodeData> = ({
  node,
}: {
  node: BoardNodeData<VideoNodeData>;
}) => {
  const { src, type } = node.data;
  const { width, height } = node.size;
  const aspect = width / height;

  return (
    <BoardNode nodeId={node.id} aspectRatio={aspect} className="video-node">
      <OptimizedVideo src={src ?? "/fallback-image.png"} type={type} />
    </BoardNode>
  );
};

export default VideoNode;
