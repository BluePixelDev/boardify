import { useSelector } from "react-redux";
import { getAllNodes } from "@/redux/nodeSelector";
import { rendererRegistry } from "./rendererRegistry";

export default function NodeCanvas() {
  const nodes = useSelector(getAllNodes);

  return (
    <div className="node-canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {nodes.map((node) => {
        const Renderer = rendererRegistry.getRenderer(node.type);

        if (Renderer) {
          return (
            <Renderer key={node.id} node={node} />
          );
        }

        {/*==== FALLBACK ====*/ }
        return (
          <div key={node.id} className="error-node">
            Unknown node type: {node.type}
          </div>
        );

      })}
    </div>
  );
}