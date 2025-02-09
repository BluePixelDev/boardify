import "./graphnode.css";
import { useRef } from "react";
import { useGraphViewContext } from "../view/GraphView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateNode } from "@/redux/nodesSlice";
import { GraphNodeSize } from "../../types"
import TransformRect from "../transform/TransformRect";

type GraphNodeProps = {
  nodeId: string;
  children?: React.ReactNode;
  aspectRatio?: number;
};

export default function GraphNode(props: GraphNodeProps) {
  const { zoom: scale } = useGraphViewContext();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const node = useSelector((state: RootState) => {
    return state.graphNodes.nodes.find((n: any) => n.id === props.nodeId)
  });

  const handleMove = (newPos: { x: number; y: number }) => {
    dispatch(updateNode({ id: props.nodeId, position: newPos }));
  };

  // When the node is resized, update its size in the store.
  const handleResize = (newSize: GraphNodeSize) => {
    dispatch(
      updateNode({
        id: props.nodeId,
        size: newSize,
        position: node?.position,
      })
    );
  };

  return (
    <TransformRect
      zoom={scale}
      initialX={node?.position.x ?? 0}
      initialY={node?.position.y ?? 0}
      initialWidth={node?.size.width ?? 100}
      initialHeight={node?.size.height ?? 100}
      draggable
      resizable
      aspectRatio={props.aspectRatio}
      onMove={handleMove}
      onResize={handleResize}
    >
      <div ref={nodeRef} className="graph-node">
        <div className="graph-node-content">{props.children}</div>
      </div>
    </TransformRect>
  );
}
