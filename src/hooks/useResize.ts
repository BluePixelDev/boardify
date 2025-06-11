import { useCallback, useEffect, useRef } from "react";

export type Directions = "n" | "s" | "e" | "w" | "se" | "ne" | "sw" | "nw";
type Size = {
  width: number;
  height: number;
};
type Position = {
  x: number;
  y: number;
};
export type ResizeResult = {
  size: Size;
  position: Position;
  onMouseDownResize: (e: React.MouseEvent, direction: Directions) => void;
};
export type GraphNodeAnchor = { x: number; y: number };
export function useResize({
  zoom,
  aspectRatio,
  minWidth,
  minHeight,
  onResize,
  onMove,
  size,
  position,
  resizable,
  anchor = { x: 0, y: 0 },
}: {
  zoom: number;
  aspectRatio?: number;
  minWidth: number;
  minHeight: number;
  onResize?: (size: Size) => void;
  onMove?: (position: Position) => void;
  size: Size;
  position: Position;
  resizable: boolean;
  anchor?: GraphNodeAnchor;
}): ResizeResult {
  const resizingRef = useRef<{
    isResizing: boolean;
    direction: Directions;
    dominantAxis?: "horizontal" | "vertical";
  }>({
    isResizing: false,
    direction: "se",
  });

  const startMousePos = useRef<Position>({ x: 0, y: 0 });
  const startSize = useRef<Size>(size);
  const startPos = useRef<Position>(position);

  const onMouseDownResize = useCallback(
    (e: React.MouseEvent, direction: Directions) => {
      if (!resizable) return;

      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.zIndex = "9999";
      overlay.style.cursor = "grabbing";
      overlay.id = "resize-overlay";
      document.body.appendChild(overlay);

      e.stopPropagation();
      e.preventDefault();

      resizingRef.current = { isResizing: true, direction };
      startMousePos.current = { x: e.clientX, y: e.clientY };
      startSize.current = size;
      startPos.current = position;
    },
    [resizable, size, position]
  );

  const getEdges = (pos: Position, size: Size) => ({
    left: pos.x,
    top: pos.y,
    right: pos.x + size.width,
    bottom: pos.y + size.height,
  });

  const onMouseMoveResize = useCallback(
    (e: MouseEvent) => {
      if (!resizingRef.current.isResizing) return;

      // Convert mouse movement from screen pixels to world units.
      const deltaX = (e.clientX - startMousePos.current.x) / zoom;
      const deltaY = (e.clientY - startMousePos.current.y) / zoom;
      const direction = resizingRef.current.direction;

      // Calculate the original edges based on the starting position.
      const startEdges = getEdges(startPos.current, startSize.current);

      const isWest = direction.includes("w");
      const isEast = direction.includes("e");
      const isNorth = direction.includes("n");
      const isSouth = direction.includes("s");

      // We copy the original edge position
      const newEdges = { ...startEdges };
      if (isWest) newEdges.left = startEdges.left + deltaX;
      if (isEast) newEdges.right = startEdges.right + deltaX;
      if (isNorth) newEdges.top = startEdges.top + deltaY;
      if (isSouth) newEdges.bottom = startEdges.bottom + deltaY;

      if (e.ctrlKey) {
        if (isEast || isWest) {
          // for horizontal, adjust both left and right from center
          const centerX = (startEdges.left + startEdges.right) / 2;
          newEdges.left = centerX - (startSize.current.width + deltaX) / 2;
          newEdges.right = centerX + (startSize.current.width + deltaX) / 2;
        }
        if (isNorth || isSouth) {
          const centerY = (startEdges.top + startEdges.bottom) / 2;
          newEdges.top = centerY - (startSize.current.height + deltaY) / 2;
          newEdges.bottom = centerY + (startSize.current.height + deltaY) / 2;
        }
      }

      if (e.altKey) {
        if (isEast) newEdges.left = startEdges.left - deltaX;
        if (isWest) newEdges.right = startEdges.right - deltaX;
        if (isNorth) newEdges.bottom = startEdges.bottom - deltaY;
        if (isSouth) newEdges.top = startEdges.top - deltaY;
      }

      let newWidth = newEdges.right - newEdges.left;
      let newHeight = newEdges.bottom - newEdges.top;

      // Width limiting
      if (newWidth < minWidth) {
        newWidth = minWidth;
        if (isWest) newEdges.left = newEdges.right - minWidth;
        if (isEast) newEdges.right = newEdges.left + minWidth;
      }

      // Height Limiting
      if (newHeight < minHeight) {
        newHeight = minHeight;
        if (isNorth) newEdges.top = newEdges.bottom - minHeight;
        if (isSouth) newEdges.bottom = newEdges.top + minHeight;
      }

      if (aspectRatio) {
        // Calculate aspect ratio constrained size
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (!resizingRef.current.dominantAxis) {
          resizingRef.current.dominantAxis =
            absDeltaX > absDeltaY ? "horizontal" : "vertical";
        }

        if (resizingRef.current.dominantAxis === "horizontal") {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }

        // Update edges to ensure proper positioning
        if (isWest) newEdges.left = startEdges.right - newWidth;
        if (isEast) newEdges.right = startEdges.left + newWidth;
        if (isNorth) newEdges.top = startEdges.bottom - newHeight;
        if (isSouth) newEdges.bottom = startEdges.top + newHeight;
      }

      const newPos = {
        x: newEdges.left - newWidth * anchor.x,
        y: newEdges.top - newHeight * anchor.y,
      };

      const newSize = {
        width: newWidth,
        height: newHeight,
      };

      onResize?.(newSize);
      onMove?.(newPos);
    },
    [zoom, minWidth, minHeight, aspectRatio, onResize, onMove, anchor]
  );

  const onMouseUpResize = useCallback(() => {
    const overlay = document.getElementById("resize-overlay");
    if (overlay) document.body.removeChild(overlay);
    resizingRef.current.isResizing = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMoveResize);
    document.addEventListener("mouseup", onMouseUpResize);
    return () => {
      document.removeEventListener("mousemove", onMouseMoveResize);
      document.removeEventListener("mouseup", onMouseUpResize);
    };
  }, [onMouseMoveResize, onMouseUpResize]);

  return { size, position, onMouseDownResize };
}
