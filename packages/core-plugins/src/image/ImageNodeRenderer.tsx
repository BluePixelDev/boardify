import { NodeRendererProps, WithApp } from "@boardify/sdk";
import { GIFNode } from "./GifNode";
import { ImageNode } from "./ImageNode";

export function ImageNodeRenderer(props: WithApp<NodeRendererProps>) {
  const { node } = props.app.hooks.useNode(props.nodeId);
  const nodeData = node?.data;

  if (!nodeData || !nodeData.imageUrl) return null;

  switch (nodeData.type) {
    case "gif":
      return <GIFNode {...props} />;
    case "image":
      return <ImageNode {...props} />;
    default:
      return null;
  }
}
