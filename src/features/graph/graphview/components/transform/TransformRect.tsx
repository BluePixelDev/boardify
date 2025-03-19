import React, { CSSProperties, MouseEventHandler, useCallback, useMemo } from "react";
import ResizeHandle from "./ResizeHandle";
import { useDrag, useResize } from "../../hooks";
import { GraphNodePosition, GraphNodeSize } from "../../types";

type TransformRectProps = {
  zoom: number
  posX: number
  posY: number
  width: number
  height: number
  draggable?: boolean
  resizable?: boolean
  aspectRatio?: number
  minWidth?: number
  minHeight?: number
  className?: string
  onMove?: (position: GraphNodePosition) => void
  onResize?: (size: GraphNodeSize) => void
  children: React.ReactNode
};

type Directions = "se" | "ne" | "sw" | "nw" | "n" | "s" | "e" | "w";
const RESIZE_HANDLE_SIZE = 8;
const MIN_DIMENSION = 100;

/**
 * A component for handling transform positioning.
 */
export default function TransformRect(props: TransformRectProps) {
  const {
    zoom,
    posX,
    posY,
    width,
    height,
    aspectRatio,
    minWidth = MIN_DIMENSION,
    minHeight = MIN_DIMENSION,
    resizable = true,
    draggable = true,
    className,
    onMove,
    onResize,
    children,
  } = props;

  const position = useMemo(() => ({ x: posX, y: posY }), [posX, posY]);
  const size = useMemo(() => ({ width: width, height: height }), [width, height]);

  const { onMouseDown: onDragMouseDown } = useDrag({
    zoom,
    onMove: onMove,
    position: position,
    draggable,
  });

  const { onMouseDownResize } = useResize({
    zoom,
    aspectRatio,
    minWidth,
    minHeight,
    onResize: onResize,
    onMove: onMove,
    size: size,
    position: position,
    resizable,
  });

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 0) return;
    onDragMouseDown(event);
  }, [onDragMouseDown]);

  const containerStyle: CSSProperties = {
    position: "absolute",
    pointerEvents: "all",
    transform: `translate3d(${Math.round(posX) - width / 2}px, ${Math.round(posY) - height / 2}px, 0)`,
    width: Math.round(width),
    height: Math.round(height),
  };

  return (
    <div style={containerStyle} onMouseDown={handleDrag} className={className ?? ""}>
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
