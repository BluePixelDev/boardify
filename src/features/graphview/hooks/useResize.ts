import { useCallback, useEffect, useRef, useState } from "react";
import { GraphNodePosition, GraphNodeSize } from "../types";

type Directions = "n" | "s" | "e" | "w" | "se" | "ne" | "sw" | "nw";

type ResizeResult = {
  size: { width: number; height: number };
  position: { x: number; y: number };
  onMouseDownResize: (e: React.MouseEvent, direction: Directions) => void;
};

export function useResize({
  zoom,
  aspectRatio,
  minWidth,
  minHeight,
  onResize,
  initialSize,
  initialPosition,
  resizable,
}: {
  zoom: number;
  aspectRatio?: number;
  minWidth: number;
  minHeight: number;
  onResize?: (size: GraphNodeSize, position: GraphNodePosition) => void;
  initialSize: { width: number; height: number };
  initialPosition: { x: number; y: number };
  resizable: boolean;
}): ResizeResult {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);

  const resizingRef = useRef<{ isResizing: boolean; direction: Directions }>({
    isResizing: false,
    direction: "se",
  });

  const startMousePos = useRef({ x: 0, y: 0 });
  const startSize = useRef(initialSize);
  const startPos = useRef(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const onMouseDownResize = useCallback(
    (e: React.MouseEvent, direction: Directions) => {
      if (!resizable) return;
      e.stopPropagation();
      e.preventDefault();
      resizingRef.current = { isResizing: true, direction };
      startMousePos.current = { x: e.clientX, y: e.clientY };
      startSize.current = size;
      startPos.current = position;
    },
    [resizable, size, position]
  );

  const onMouseMoveResize = useCallback(
    (e: MouseEvent) => {
      if (!resizingRef.current.isResizing) return;

      const deltaX = (e.clientX - startMousePos.current.x) / zoom;
      const deltaY = (e.clientY - startMousePos.current.y) / zoom;

      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;
      let newX = startPos.current.x;
      let newY = startPos.current.y;

      switch (resizingRef.current.direction) {
        case "se":
          newWidth = Math.max(minWidth, startSize.current.width + deltaX);
          newHeight = Math.max(minHeight, startSize.current.height + deltaY);
          break;
        case "sw":
          newWidth = Math.max(minWidth, startSize.current.width - deltaX);
          newHeight = Math.max(minHeight, startSize.current.height + deltaY);
          newX = startPos.current.x + deltaX;
          break;
        case "ne":
          newWidth = Math.max(minWidth, startSize.current.width + deltaX);
          newHeight = Math.max(minHeight, startSize.current.height - deltaY);
          newY = startPos.current.y + deltaY;
          break;
        case "nw":
          newWidth = Math.max(minWidth, startSize.current.width - deltaX);
          newHeight = Math.max(minHeight, startSize.current.height - deltaY);
          newX = startPos.current.x + deltaX;
          newY = startPos.current.y + deltaY;
          break;
        case "n":
          newHeight = Math.max(minHeight, startSize.current.height - deltaY);
          newY = startPos.current.y + deltaY;
          break;
        case "s":
          newHeight = Math.max(minHeight, startSize.current.height + deltaY);
          break;
        case "e":
          newWidth = Math.max(minWidth, startSize.current.width + deltaX);
          break;
        case "w":
          newWidth = Math.max(minWidth, startSize.current.width - deltaX);
          newX = startPos.current.x + deltaX;
          break;
      }

      if (aspectRatio) {
        const aspectLimitedWidth = newHeight * aspectRatio;
        const aspectLimitedHeight = newWidth / aspectRatio;

        if (newWidth / newHeight > aspectRatio) {
          newWidth = aspectLimitedWidth;
        } else {
          newHeight = aspectLimitedHeight;
        }

        if (resizingRef.current.direction.includes("w")) {
          newX = startPos.current.x + (startSize.current.width - newWidth);
        }
        if (resizingRef.current.direction.includes("n")) {
          newY = startPos.current.y + (startSize.current.height - newHeight);
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });

      onResize?.(
        { width: newWidth, height: newHeight },
        { x: newX, y: newY }
      );
    },
    [zoom, minWidth, minHeight, aspectRatio, onResize]
  );

  const onMouseUpResize = useCallback(() => {
    resizingRef.current.isResizing = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMoveResize);
    window.addEventListener("mouseup", onMouseUpResize);
    return () => {
      window.removeEventListener("mousemove", onMouseMoveResize);
      window.removeEventListener("mouseup", onMouseUpResize);
    };
  }, [onMouseMoveResize, onMouseUpResize]);

  return { size, position, onMouseDownResize };
}
