import { useCallback, useEffect, useRef } from "react";
import { GraphNodePosition, GraphNodeSize } from "../types";

export type Directions = "n" | "s" | "e" | "w" | "se" | "ne" | "sw" | "nw";
export type ResizeResult = {
  size: GraphNodeSize;
  position: GraphNodePosition;
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
  anchor = { x: 0, y: 0 }
}: {
  zoom: number
  aspectRatio?: number
  minWidth: number
  minHeight: number
  onResize?: (size: GraphNodeSize) => void;
  onMove?: (position: GraphNodePosition) => void
  size: GraphNodeSize
  position: GraphNodePosition
  resizable: boolean
  anchor?: GraphNodeAnchor;
}): ResizeResult {

  // Store the current resizing state and starting values.
  const resizingRef = useRef<{ isResizing: boolean; direction: Directions, dominantAxis?: 'horizontal' | 'vertical' }>({
    isResizing: false,
    direction: "se",
  });

  const startMousePos = useRef<GraphNodePosition>({ x: 0, y: 0 });
  const startSize = useRef<GraphNodeSize>(size);
  const startPos = useRef<GraphNodePosition>(position);

  // When a resize starts, record the starting mouse, size and position.
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

  // Calculate new size and position as the mouse moves.
  const onMouseMoveResize = useCallback(
    (e: MouseEvent) => {
      if (!resizingRef.current.isResizing) return;

      // Convert mouse movement from screen pixels to world units.
      const deltaX = (e.clientX - startMousePos.current.x) / zoom;
      const deltaY = (e.clientY - startMousePos.current.y) / zoom;
      const direction = resizingRef.current.direction;

      // Calculate the original edges based on the starting position.
      const startEdges = {
        left: startPos.current.x,
        top: startPos.current.y,
        right: startPos.current.x + startSize.current.width,
        bottom: startPos.current.y + startSize.current.height,
      };

      const isWest = direction.includes("w")
      const isEast = direction.includes("e")
      const isNorth = direction.includes("n")
      const isSouth = direction.includes("s")

      // We copy the original edge position
      let newEdges = { ...startEdges };
      if (isWest) newEdges.left = startEdges.left + deltaX;
      if (isEast) newEdges.right = startEdges.right + deltaX;
      if (isNorth) newEdges.top = startEdges.top + deltaY;
      if (isSouth) newEdges.bottom = startEdges.bottom + deltaY;

      let newWidth = newEdges.right - newEdges.left;
      let newHeight = newEdges.bottom - newEdges.top;

      // Width limiting
      if (newWidth < minWidth) {
        newWidth = minWidth;
        if (isWest) newEdges.left = newEdges.right - minWidth
        if (isEast) newEdges.right = newEdges.left + minWidth
      }

      // Height Limiting
      if (newHeight < minHeight) {
        newHeight = minHeight;
        if (isNorth) newEdges.top = newEdges.bottom - minHeight
        if (isSouth) newEdges.bottom = newEdges.top + minHeight
      }

      if (aspectRatio) {
        // Calculate aspect ratio constrained size
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (!resizingRef.current.dominantAxis) {
          resizingRef.current.dominantAxis = absDeltaX > absDeltaY ? 'horizontal' : 'vertical';
        }

        if (resizingRef.current.dominantAxis === 'horizontal') {
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
        height: newHeight
      }

      onResize?.(newSize);
      onMove?.(newPos)
    },
    [zoom, minWidth, minHeight, aspectRatio, onResize, onMove, anchor]
  );

  // End resizing on mouse up.
  const onMouseUpResize = useCallback(() => {
    resizingRef.current.isResizing = false;
  }, []);

  // Attach global mouse events.
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