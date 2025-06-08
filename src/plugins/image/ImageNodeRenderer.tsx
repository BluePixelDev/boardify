import { BoardNodeData } from "@/features/board";
import ImageNode from "./normal/ImageNode";
import { ImageNodeData } from "./types";
import { IRenderer } from "@/features/board/renderer";
import GIFNode from "./gif/GifNode";

export class ImageNodeRenderer implements IRenderer<ImageNodeData> {
  render = (node: BoardNodeData<unknown>): JSX.Element | null => {
    const nodeData = node as BoardNodeData<ImageNodeData>;
    const data = nodeData.data;

    if (!nodeData) return null;
    if (!data || !data.imageUrl) {
      return null;
    }

    switch (data.type) {
      case "gif":
        return <GIFNode node={node as BoardNodeData<ImageNodeData>} />;
      case "image":
        return <ImageNode node={node as BoardNodeData<ImageNodeData>} />;
      default:
        return null;
    }
  };
}
