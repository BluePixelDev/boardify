import { useCallback, useEffect, useRef } from "react";
import { GraphNodePosition } from "../types";

type DragResult = {
  position: GraphNodePosition;
  onMouseDown: (e: React.MouseEvent) => void;
};

export function useDrag({
  zoom,
  onMove,
  position,
  draggable,
  dragThreshold = 5,
}: {
  zoom: number;
  onMove?: (position: GraphNodePosition) => void;
  position: GraphNodePosition;
  draggable: boolean;
  dragThreshold?: number;
}): DragResult {

  const draggingRef = useRef(false);
  const startMousePos = useRef({ x: 0, y: 0 });
  const startPos = useRef(position);
  const draggedElementRef = useRef<HTMLElement | null>(null);
  const hasDragged = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor && elementUnderCursor.closest(".no-drag")) {
        return
      }

      draggingRef.current = true;
      startMousePos.current = { x: e.clientX, y: e.clientY };
      startPos.current = position;
      draggedElementRef.current = e.currentTarget as HTMLElement;
      hasDragged.current = false;
    },
    [draggable, position]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current) return;

      const deltaX = e.clientX - startMousePos.current.x;
      const deltaY = e.clientY - startMousePos.current.y;

      if (!hasDragged.current && Math.sqrt(deltaX ** 2 + deltaY ** 2) >= dragThreshold) {
        hasDragged.current = true;
        if (draggedElementRef.current) {
          draggedElementRef.current.style.pointerEvents = "none";
        }
      }

      if (hasDragged.current) {
        const newPos: GraphNodePosition = {
          x: startPos.current.x + deltaX / zoom,
          y: startPos.current.y + deltaY / zoom,
        };
        onMove?.(newPos);
      }
    },
    [zoom, onMove, hasDragged]
  );

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
    if (draggedElementRef.current) {
      draggedElementRef.current.style.pointerEvents = "";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return { position, onMouseDown };
}
