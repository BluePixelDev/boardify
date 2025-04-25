import "./node.styles.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InteractiveRect from "./InteractiveRect";
import {
  clearAllNodeSelections,
  toggleNodeSelectionStatus,
  updateNode,
} from "../../store/graphSlice";
import { isNodeSelected, selectNodeById } from "../../store/selectors";
import { GraphNodePosition, GraphNodeSize } from "../../store";
import { useAppSelector } from "@/store";

type GraphNodeProps = {
  nodeId: string;
  children?: React.ReactNode;
  aspectRatio?: number;
  className?: string;
  resizable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function GraphNode({
  nodeId,
  aspectRatio,
  children,
  className,
  resizable,
  onClick,
  onDoubleClick,
  onContextMenu,
}: GraphNodeProps) {
  const { zoom } = useAppSelector((state) => state.graph.graphView);
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const nodeData = useSelector(selectNodeById(nodeId));
  const isSelected = useSelector(isNodeSelected(nodeId));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    dispatch(clearAllNodeSelections());
    dispatch(toggleNodeSelectionStatus(nodeId));
  };

  const handleMove = (newPos: GraphNodePosition) => {
    dispatch(
      updateNode({
        id: nodeId,
        changes: {
          position: newPos,
        },
      })
    );
  };

  const handleResize = (newSize: GraphNodeSize) => {
    dispatch(
      updateNode({
        id: nodeId,
        changes: {
          size: { ...newSize },
        },
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
        style={{
          outlineWidth: `${Math.round(1 / zoom)}px`,
        }}
      >
        {children}
      </div>
    </InteractiveRect>
  );
}
