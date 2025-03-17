import { useCallback, useEffect,  useRef } from "react";
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
}: {
  zoom: number;
  onMove?: (position: GraphNodePosition) => void;
  position: GraphNodePosition;
  draggable: boolean;
}): DragResult {
  const draggingRef = useRef(false);
  const startMousePos = useRef({ x: 0, y: 0 });
  const startPos = useRef(position);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;
      draggingRef.current = true;
      startMousePos.current = { x: e.clientX, y: e.clientY };
      startPos.current = position;
    },
    [draggable, position]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current) return;

      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      if (elementUnderCursor && elementUnderCursor.closest(".no-drag")) {
        draggingRef.current = false;
        return;
      }

      const deltaX = e.clientX - startMousePos.current.x;
      const deltaY = e.clientY - startMousePos.current.y;
      const newPos: GraphNodePosition = {
        x: startPos.current.x + deltaX / zoom,
        y: startPos.current.y + deltaY / zoom,
      };
      onMove?.(newPos);
    },
    [zoom, onMove]
  );

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
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
