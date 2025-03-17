import "../graphviewStyles.css";
import { useRef } from "react";
import { useGraphViewContext } from "./GraphView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateNode } from "@/redux/nodesSlice";
import { GraphNodePosition, GraphNodeSize } from "../types"
import TransformRect from "./transform/TransformRect";
import { selectNodeById } from "@/redux/nodeSelector";

type GraphNodeProps = {
  nodeId: string;
  children?: React.ReactNode;
  aspectRatio?: number;
};

export default function GraphNode({
  nodeId,
  aspectRatio,
  children
}: GraphNodeProps) {
  const { zoom: scale } = useGraphViewContext();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const node = useSelector((state: RootState) => selectNodeById(state, nodeId))

  const handleMove = (newPos: GraphNodePosition) =>
    dispatch(
      updateNode({
        id: nodeId,
        position: newPos,
      })
    );

  const handleResize = (newSize: GraphNodeSize) => {
    dispatch(
      updateNode({
        id: nodeId,
        size: { ...newSize },
      })
    );
  };

  return (
    <TransformRect
      zoom={scale}
      posX={node?.position.x ?? 0}
      posY={node?.position.y ?? 0}
      width={node?.size.width ?? 100}
      height={node?.size.height ?? 100}
      draggable
      resizable
      aspectRatio={aspectRatio}
      onMove={handleMove}
      onResize={handleResize}
    >
      <div ref={nodeRef} className="graph-node">
        {children}
      </div>
    </TransformRect>
  );
}
