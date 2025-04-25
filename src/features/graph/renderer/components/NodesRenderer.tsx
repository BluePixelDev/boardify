import { selectAllNodesOnCurrentLayer } from "../../store/selectors";
import { FallbackNode } from "./FallbackNode";
import { rendererRegistry } from "../rendererRegistry";
import { useAppSelector } from "@/store";

export default function NodeCanvas() {
  const nodes = useAppSelector(selectAllNodesOnCurrentLayer);

  return (
    <div className="node-canvas__container">
      {nodes.map((node) => {
        const Renderer = rendererRegistry.getRenderer(node.type);

        if (Renderer) {
          const renderedNode = Renderer.render(node);
          if (renderedNode) {
            return (
              <div key={node.id} className="node-canvas__item">
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
