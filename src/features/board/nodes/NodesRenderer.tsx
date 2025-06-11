import { useAppSelector } from "@/redux";
import { rendererRegistry } from "@/core/renderers";
import React from "react";
import { selectNodesInCurrentLayer } from "@/redux/selectors/nodesSelectors";

interface NodesRendererProps {
  fallback: (nodeId: string) => React.ReactNode;
}

export default function NodesRenderer({ fallback }: NodesRendererProps) {
  const nodes = useAppSelector(selectNodesInCurrentLayer);

  return (
    <>
      {nodes.map((node) => {
        const Renderer = rendererRegistry.getRenderer(node.type);
        return (
          <React.Fragment key={node.id}>
            {Renderer?.render(node.id) ?? fallback(node.id)}
          </React.Fragment>
        );
      })}
    </>
  );
}
