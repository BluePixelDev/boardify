import ImageNode from "./normal/ImageNode";
import GIFNode from "./gif/GifNode";
import { IRenderer } from "@/core/renderers";
import { useNode } from "@/features/board/nodes/hooks/useNode";
import { ImageNodeData } from "./types";

export class ImageNodeRenderer implements IRenderer {
  render = (nodeId: string): JSX.Element | null => {
    const node = useNode<ImageNodeData>(nodeId);
    const nodeData = node?.data;

    if (!nodeData) return null;
    if (!nodeData || !nodeData.imageUrl) {
      return null;
    }

    switch (nodeData.type) {
      case "gif":
        return <GIFNode nodeId={node.id} />;
      case "image":
        return <ImageNode nodeId={node.id} />;
      default:
        return null;
    }
  };
}
