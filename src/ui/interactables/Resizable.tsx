import React from "react";
import { useResize } from "../../hooks/useResize";
import { Position, Size } from "./types";
import { ResizeHandle } from "./ResizeHandle";

type Directions = "se" | "ne" | "sw" | "nw" | "n" | "s" | "e" | "w";
const DIRECTIONS: Directions[] = ["n", "s", "e", "w", "se", "ne", "sw", "nw"];

const RESIZE_HANDLE_SIZE = 8;

interface ResizableProps {
  size: Size;
  position: Position;
  zoom: number;
  resizable?: boolean;
  aspectRatio?: number;
  showHandles?: boolean;
  minWidth?: number;
  minHeight?: number;
  onResize?: (size: Size) => void;
  onMove?: (position: Position) => void;
  children: React.ReactNode;
}

export function Resizable({
  size,
  position,
  zoom,
  resizable = true,
  aspectRatio,
  showHandles = true,
  minWidth = 100,
  minHeight = 100,
  onResize,
  onMove,
  children,
}: ResizableProps) {
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

  return (
    <div
      style={{ width: size.width, height: size.height }}
      className="resizable"
    >
      {children}
      {resizable &&
        showHandles &&
        DIRECTIONS.map((dir) => (
          <ResizeHandle
            key={dir}
            direction={dir}
            width={RESIZE_HANDLE_SIZE / zoom}
            height={RESIZE_HANDLE_SIZE / zoom}
            onMouseDown={(e) => onMouseDownResize(e, dir)}
          />
        ))}
    </div>
  );
}
