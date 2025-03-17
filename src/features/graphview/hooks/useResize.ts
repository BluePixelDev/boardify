import { useCallback, useEffect, useRef, useState } from "react";
import { GraphNodePosition, GraphNodeSize } from "../types";

type Directions = "n" | "s" | "e" | "w" | "se" | "ne" | "sw" | "nw";

export type ResizeResult = {
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

  // Store the current resizing state and starting values.
  const resizingRef = useRef<{ isResizing: boolean; direction: Directions }>({
    isResizing: false,
    direction: "se",
  });
  const startMousePos = useRef({ x: 0, y: 0 });
  const startSize = useRef(initialSize);
  const startPos = useRef(initialPosition);

  // Update the position when initialPosition changes.
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Helper: Convert center-based coordinates into edge coordinates.
  const getEdges = (
    pos: GraphNodePosition,
    size: GraphNodeSize
  ) => ({
    left: pos.x - size.width / 2,
    right: pos.x + size.width / 2,
    top: pos.y - size.height / 2,
    bottom: pos.y + size.height / 2,
  });

  // Helper: Given an anchor (based on drag direction), compute the new center.
  const getAnchoredCenter = (
    direction: Directions,
    edges: ReturnType<typeof getEdges>,
    width: number,
    height: number
  ) => {
    switch (direction) {
      case "se":
        // Top-left
        return { x: edges.left + width / 2, y: edges.top + height / 2 };
      case "sw":
        // Top-right
        return { x: edges.right - width / 2, y: edges.top + height / 2 };
      case "ne":
        // Bottom-left
        return { x: edges.left + width / 2, y: edges.bottom - height / 2 };
      case "nw":
        // Bottom-right
        return { x: edges.right - width / 2, y: edges.bottom - height / 2 };
      default:
        // For non-corner directions, just return the starting center.
        return { x: startPos.current.x, y: startPos.current.y };
    }
  };

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
      const startEdges = getEdges(startPos.current, startSize.current);

      // Compute new edge positions by adding the delta.
      const newLeft = startEdges.left + deltaX;
      const newRight = startEdges.right + deltaX;
      const newTop = startEdges.top + deltaY;
      const newBottom = startEdges.bottom + deltaY;

      // Default to the starting size.
      let newWidth = startSize.current.width;
      let newHeight = startSize.current.height;
      let newCenter = { ...startPos.current };

      // Update width and height based on the drag direction.
      switch (direction) {
        case "se":
          newWidth = Math.max(minWidth, newRight - startEdges.left);
          newHeight = Math.max(minHeight, newBottom - startEdges.top);
          break;
        case "sw":
          newWidth = Math.max(minWidth, startEdges.right - newLeft);
          newHeight = Math.max(minHeight, newBottom - startEdges.top);
          break;
        case "ne":
          newWidth = Math.max(minWidth, newRight - startEdges.left);
          newHeight = Math.max(minHeight, startEdges.bottom - newTop);
          break;
        case "nw":
          newWidth = Math.max(minWidth, startEdges.right - newLeft);
          newHeight = Math.max(minHeight, startEdges.bottom - newTop);
          break;
        default:
          break;
      }

      // Calculate the new center based on the anchored corner.
      newCenter = getAnchoredCenter(direction, startEdges, newWidth, newHeight);

      // Enforce the aspect ratio, if provided.
      if (aspectRatio) {
        const aspectLimitedWidth = newHeight * aspectRatio;
        const aspectLimitedHeight = newWidth / aspectRatio;

        if (newWidth / newHeight > aspectRatio) {
          newWidth = aspectLimitedWidth;
        } else {
          newHeight = aspectLimitedHeight;
        }

        // Recalculate the center to keep the anchor fixed.
        newCenter = getAnchoredCenter(direction, startEdges, newWidth, newHeight);
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition(newCenter);
      onResize?.({ width: newWidth, height: newHeight }, newCenter);
    },
    [zoom, minWidth, minHeight, aspectRatio, onResize]
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