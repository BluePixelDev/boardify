import { FallbackNode } from "./FallbackNode";
import { rendererRegistry } from "../rendererRegistry";
import { useAppSelector } from "@/redux";
import "./nodesRenderer.styles.css";
import { BoardNodeData } from "../../types";
import { selectNodesInCurrentLayer } from "../../slices";

export default function NodesRenderer() {
  const nodes = useAppSelector(selectNodesInCurrentLayer);

  return (
    <div className="node-renderer__container">
      {nodes.map((node: BoardNodeData<unknown>) => {
        const Renderer = rendererRegistry.getRenderer(node.type);

        if (Renderer) {
          const renderedNode = Renderer.render(node);
          if (renderedNode) {
            return (
              <div key={node.id} className="node-renderer__item">
                {renderedNode}
              </div>
            );
          }
        }

        return <FallbackNode key={node.id} node={node} />;
      })}
    </div>
  );
}
