import { useSelector } from "react-redux";
import { selectAllNodes } from "@/redux/nodeSelector";
import { rendererRegistry } from "./rendererRegistry";

export default function NodeCanvas() {
  const nodes = useSelector(selectAllNodes);

  return (
    <div className="node-canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {nodes.map((node) => {
        const Renderer = rendererRegistry.getRenderer(node.type);

        if (Renderer) {
          return (
            <div key={node.id} className="node-wrapper">
              <Renderer node={node} />
            </div>
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