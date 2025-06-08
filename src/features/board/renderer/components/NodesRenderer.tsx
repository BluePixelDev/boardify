import { selectAllNodesOnCurrentLayer } from "../../store/selectors";
import { FallbackNode } from "./FallbackNode";
import { rendererRegistry } from "../rendererRegistry";
import { useAppSelector } from "@/store";
import "./nodesRenderer.styles.css";

export default function NodesRenderer() {
  const nodes = useAppSelector(selectAllNodesOnCurrentLayer);

  return (
    <div className="node-renderer__container">
      {nodes.map((node) => {
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
