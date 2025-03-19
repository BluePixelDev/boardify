import "../graphStyles.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectNode, updateNode } from "@/redux/nodesSlice";
import { GraphNodePosition, GraphNodeSize } from "../types"
import TransformRect from "./transform/TransformRect";
import { selectNodeById } from "@/redux/nodeSelector";
import { useGraphViewContext } from "./transform/GraphViewContext";

type GraphNodeProps = {
  nodeId: string
  children?: React.ReactNode
  aspectRatio?: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void
};

export default function raphNode({
  nodeId,
  aspectRatio,
  children,
  className,
  onClick,
  onDoubleClick
}: GraphNodeProps) {
  const { zoom } = useGraphViewContext();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const node = useSelector((state: RootState) => selectNodeById(state, nodeId))

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    dispatch(selectNode({ id: nodeId }));
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onDoubleClick?.(event);
    dispatch(selectNode({ id: nodeId }));
  };

  const handleMove = (newPos: GraphNodePosition) => {
    dispatch(
      updateNode({
        id: nodeId,
        position: newPos,
      })
    );
  }

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
      zoom={zoom}
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
      <div
        ref={nodeRef}
        className={`graph-node ${className}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {children}
      </div>
    </TransformRect>
  );
}
