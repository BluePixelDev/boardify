import './interactRect.css'
import React, { CSSProperties, MouseEventHandler, useCallback, useMemo } from "react";
import ResizeHandle from "./ResizeHandle";
import { useDrag, useResize } from "../hooks";
import { GraphNodePosition, GraphNodeSize } from "../types";

type InteractiveRectProps = {
  zoom: number

  // Position
  posX: number
  posY: number
  draggable?: boolean

  // Size
  width: number
  height: number
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number
  resizable?: boolean

  // Rotation
  rotation?: number;

  // Styling
  className?: string

  // Functions
  onMove?: (position: GraphNodePosition) => void
  onResize?: (size: GraphNodeSize) => void
  onClick?: () => void;
  children: React.ReactNode
};

// Constants
type Directions = "se" | "ne" | "sw" | "nw" | "n" | "s" | "e" | "w";
const RESIZE_HANDLE_SIZE = 8;
const MIN_DIMENSION = 100;

/**
 * InteractiveRect is a draggable, resizable, and optionally rotatable rectangle.
 */
export default function InteractiveRect(props: InteractiveRectProps) {
  const {
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
    // Rotation
    rotation = 0,

    className,
    onMove,
    onResize,
    onClick,
    children,
  } = props;

  const position = useMemo(() => ({ x: posX, y: posY }), [posX, posY]);
  const size = useMemo(() => ({ width: width, height: height }), [width, height]);

  const { onMouseDown: onDragMouseDown } = useDrag({
    zoom,
    onMove,
    position,
    draggable,
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

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 0) return;
    onDragMouseDown(event);
  }, [onDragMouseDown]);

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
      className={`interact-rect ${className ?? ""}`}>
      {children}
      {resizable &&
        (["n", "s", "e", "w", "se", "ne", "sw", "nw"] as Directions[]).map((direction) => (
          <ResizeHandle
            key={direction}
            direction={direction}
            style={{
              position: "absolute",
              ...(direction === "e" ? { right: 0, top: "50%", transform: "translateY(-50%)" } : {}),
              ...(direction === "w" ? { left: 0, top: "50%", transform: "translateY(-50%)" } : {}),
              ...(direction === "s" ? { bottom: 0, left: "50%", transform: "translateX(-50%)" } : {}),
              ...(direction === "n" ? { top: 0, left: "50%", transform: "translateX(-50%)" } : {}),
              ...(direction === "se" ? { right: 0, bottom: 0 } : {}),
              ...(direction === "ne" ? { right: 0, top: 0 } : {}),
              ...(direction === "sw" ? { left: 0, bottom: 0 } : {}),
              ...(direction === "nw" ? { left: 0, top: 0 } : {}),
            }}
            width={RESIZE_HANDLE_SIZE / zoom}
            height={RESIZE_HANDLE_SIZE / zoom}
            onMouseDown={(e) => onMouseDownResize(e, direction)}
          />
        ))}
    </div>
  );
}
