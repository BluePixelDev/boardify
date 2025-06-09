import { useAppSelector } from "@/redux";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllNodeSelections,
  moveSelectedNodes,
  toggleNodeSelectionStatus,
  updateNode,
} from "../../slices/nodes.slice";
import { isNodeSelected, selectNodeById } from "../../slices/selectors";
import InteractiveRect from "./InteractiveRect";
import "./node.styles.css";
import { BoardNodeSize, GraphNodePosition } from "../../types";

type BoardNodeProps = {
  nodeId: string;
  children?: React.ReactNode;
  aspectRatio?: number;
  className?: string;
  resizable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function BoardNode({
  nodeId,
  aspectRatio,
  children,
  className,
  resizable,
  onClick,
  onDoubleClick,
  onContextMenu,
}: BoardNodeProps) {
  const { zoom } = useAppSelector((state) => state.board.view);
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
      moveSelectedNodes({
        dx: newPos.x - (nodeData?.position.x ?? 0),
        dy: newPos.y - (nodeData?.position.y ?? 0),
      })
    );
    dispatch(
      updateNode({
        id: nodeId,
        changes: {
          position: newPos,
        },
      })
    );
  };

  const handleResize = (newSize: BoardNodeSize) => {
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
        className={`board-node ${isSelected ? "selected" : ""} ${className}`}
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
