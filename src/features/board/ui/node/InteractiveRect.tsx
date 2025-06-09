import React, {
  CSSProperties,
  MouseEventHandler,
  useCallback,
  useMemo,
} from "react";
import { useDrag, useResize } from "../../hooks";
import { DragDelta } from "../../hooks/useDrag";
import { GraphNodePosition, BoardNodeSize } from "../../store";
import "./node.styles.css";
import ResizeHandle from "./ResizeHandle";

type InteractiveRectProps = {
  zoom: number;

  // Position
  posX: number;
  posY: number;
  draggable?: boolean;

  // Size
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number;
  resizable?: boolean;
  showHandles?: boolean;

  // Rotation
  rotation?: number;

  // Styling
  className?: string;

  // Functions
  onMove?: (position: GraphNodePosition) => void;
  onResize?: (size: BoardNodeSize) => void;
  onClick?: () => void;
  children: React.ReactNode;
};

// Constants
type Directions = "se" | "ne" | "sw" | "nw" | "n" | "s" | "e" | "w";
const DIRECTIONS: Directions[] = ["n", "s", "e", "w", "se", "ne", "sw", "nw"];
const RESIZE_HANDLE_SIZE = 8;
const MIN_DIMENSION = 100;

/**
 * InteractiveRect is a draggable, resizable, and optionally rotatable rectangle.
 */
export default function InteractiveRect({
  zoom,
  // Position
  posX,
  posY,
  draggable = true,

  // Size
  width,
  height,
  minWidth = MIN_DIMENSION,
  minHeight = MIN_DIMENSION,
  aspectRatio,
  resizable = true,
  showHandles = true,
  // Rotation
  rotation = 0,

  className,
  onMove,
  onResize,
  onClick,
  children,
}: InteractiveRectProps) {
  const position = useMemo(() => ({ x: posX, y: posY }), [posX, posY]);
  const size = useMemo(
    () => ({ width: width, height: height }),
    [width, height]
  );

  const onDragMove = useCallback(
    (drag: DragDelta) => {
      if (!draggable) return;
      onMove?.({
        x: posX + drag.deltaX / zoom,
        y: posY + drag.deltaY / zoom,
      });
    },
    [position, draggable]
  );

  const { onMouseDown: onDragMouseDown } = useDrag({
    onDrag: onDragMove,
    dragThreshold: 10,
  });

  const { onMouseDownResize } = useResize({
    zoom,
    aspectRatio,
    minWidth,
    minHeight,
    onResize,
    onMove,
    size,
    position,
    resizable,
  });

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.button !== 0) return;
      onDragMouseDown(event);
    },
    [onDragMouseDown]
  );

  const containerStyle: CSSProperties = {
    transform: `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0px) rotate(${rotation}deg)`,
    width: Math.round(width),
    height: Math.round(height),
  };

  return (
    <div
      style={containerStyle}
      onMouseDown={handleDrag}
      onClick={onClick}
      className={`interact-rect ${className ?? ""}`}
    >
      {children}
      {resizable &&
        showHandles &&
        DIRECTIONS.map((direction) => (
          <ResizeHandle
            key={direction}
            direction={direction}
            width={RESIZE_HANDLE_SIZE / zoom}
            height={RESIZE_HANDLE_SIZE / zoom}
            onMouseDown={(e) => onMouseDownResize(e, direction)}
          />
        ))}
    </div>
  );
}
