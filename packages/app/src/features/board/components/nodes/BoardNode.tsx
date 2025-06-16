import { useAppSelector } from "@/redux";
import { Draggable } from "@/ui/interactables";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNode } from "@/features/board/hooks/useNode";
import "./node.styles.css";
import { clearAllNodeSelections, toggleNodeSelectionStatus } from "../../store";
import { NodePosition } from "../../types";

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

export function BoardNode({
  nodeId,
  children,
  className,
  onClick,
  onDoubleClick,
  onContextMenu,
}: BoardNodeProps) {
  const { zoom } = useAppSelector((state) => state.board.view);
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { moveSelected, move, isSelected, node } = useNode(nodeId);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);

    if (event.ctrlKey || event.metaKey) {
      dispatch(toggleNodeSelectionStatus(nodeId));
    } else {
      dispatch(clearAllNodeSelections());
      dispatch(toggleNodeSelectionStatus(nodeId));
    }
  };

  const handleMove = (newPos: NodePosition) => {
    if (isSelected) {
      moveSelected(newPos);
    }
    move(newPos);
  };

  return (
    <Draggable
      position={node?.position ?? { x: 0, y: 0 }}
      onMove={handleMove}
      zoom={zoom}
      className={`board-node no-selection-layer ${isSelected ? "selected" : ""}`}
      style={{
        width: node?.size.width,
        height: node?.size.height,
      }}
    >
      <div
        ref={nodeRef}
        className={className}
        onContextMenu={onContextMenu}
        onClick={handleClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </div>
    </Draggable>
  );
}
