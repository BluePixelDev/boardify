import { BoardNodeData } from "@/features/board";
import { IRenderer } from "@/features/board/renderer";
import { VideoNodeData } from "./types";
import VideoNode from "./VideoNode";

export class VideoNodeRenderer implements IRenderer<VideoNodeData> {
  render = (node: BoardNodeData<unknown>): JSX.Element | null => {
    const nodeData = node as BoardNodeData<VideoNodeData>;
    const data = nodeData.data;

    if (!nodeData) return null;
    if (!data || !data.src) {
      return null;
    }

    return <VideoNode node={node as BoardNodeData<VideoNodeData>} />;
  };
}
