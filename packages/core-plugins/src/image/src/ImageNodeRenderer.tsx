import { GIFNode } from "./GifNode";
import { ImageNode } from "./ImageNode";
import { ImageNodeData } from "./types";
import { NodeRendererProps, sdk } from "@boardify/sdk";

export function ImageNodeRenderer({ nodeId }: NodeRendererProps) {
  const { node } = sdk.hooks.useNode<ImageNodeData>(nodeId);
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
}
