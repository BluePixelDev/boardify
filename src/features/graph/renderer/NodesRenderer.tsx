import { useSelector } from "react-redux";
import { rendererRegistry } from "./RendererRegistry";
import { getAllNodes } from "@/redux/nodes/nodeSelector";

export default function NodeCanvas() {
  const nodes = useSelector(getAllNodes);

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
            )
          }
        }

        return (
          <h1 key={node.id}>No node found!</h1>
        )
      })}
    </div>
  );
}