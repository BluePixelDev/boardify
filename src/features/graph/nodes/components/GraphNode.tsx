import "../node.styles.css"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deselectAllNodes, toggleNodeSelection, updateNode } from "@/redux/nodes/nodesSlice";
import InteractiveRect from "./InteractiveRect";
import { useGraphViewContext } from "../../graphview/context/GraphViewProvider";
import { GraphNodePosition, GraphNodeSize } from "../node.types";
import { getNodeById, isNodeSelected } from "@/redux/nodes/nodeSelector";

type GraphNodeProps = {
  nodeId: string
  children?: React.ReactNode
  aspectRatio?: number
  className?: string
  resizable?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void
};

export default function GraphNode({
  nodeId,
  aspectRatio,
  children,
  className,
  resizable,
  onClick,
  onDoubleClick,
  onContextMenu
}: GraphNodeProps) {
  const { zoom } = useGraphViewContext();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const nodeData = useSelector((state: RootState) => getNodeById(state, nodeId))
  const isSelected = useSelector((state: RootState) => isNodeSelected(state, nodeId))

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    dispatch(deselectAllNodes())
    dispatch(toggleNodeSelection(nodeId));
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
    <InteractiveRect
      zoom={zoom}
      posX={nodeData?.position.x ?? 0}
      posY={nodeData?.position.y ?? 0}
      width={nodeData?.size.width ?? 100}
      height={nodeData?.size.height ?? 100}
      draggable
      showHandles={isSelected}
      resizable={resizable ?? true}
      aspectRatio={aspectRatio}
      onMove={handleMove}
      onResize={handleResize}
    >
      <div
        ref={nodeRef}
        className={`graph-node ${isSelected ? "selected" : ""} ${className}`}
        onContextMenu={onContextMenu}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </div>
    </InteractiveRect>
  );
}
