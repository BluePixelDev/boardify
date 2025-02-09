import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { nodeRendererManager } from "@/features/nodes/renderer/NodeRenderManger";
import { RootState } from "@/redux/store";
import { addNode } from "@/redux/nodesSlice";
import ImageNodeRenderer from "../built-in/ImageNode";
import { GraphViewNode } from "../../graphview/types";

const registerDefaultRenderers = () => {
  nodeRendererManager.register('image', ImageNodeRenderer);
};

registerDefaultRenderers();

export default function NodeCanvas() {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.graphNodes.nodes);

  const initializeDefaultNode = useCallback(() => {
    const hasExistingNodes = nodes.length > 0;
    if (!hasExistingNodes) {
      const newNode: GraphViewNode = {
        id: uuidv4(),
        type: "image",
        position: { x: 100, y: 100 },
        size: { width: 200, height: 200 },
        data: {
          src: "./vite.svg",
          alt: "Example visualization"
        }
      };
      dispatch(addNode(newNode));
    }
  }, [dispatch, nodes.length]);

  useEffect(() => {
    initializeDefaultNode();
  }, [initializeDefaultNode]);

  return (
    <div className="node-canvas-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {nodes.map((node) => {
        const Renderer = nodeRendererManager.getRenderer(node.type);

        return (
          <div key={node.id}>
            {Renderer ? (<Renderer node={node} />) : (
              <div className="error-node">
                Unknown node type: {node.type}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}