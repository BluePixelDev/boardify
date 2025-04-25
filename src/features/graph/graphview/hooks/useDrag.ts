import { useCallback, useEffect, useRef, useState } from "react";

export interface DragDelta {
  deltaX: number;
  deltaY: number;
}

export interface DragStartInfo {
  startX: number;
  startY: number;
  target: HTMLElement | null;
}

interface DragHookProps {
  onDrag: (drag: DragDelta) => void;
  onDragStart?: (info: DragStartInfo) => void;
  dragThreshold?: number;
}

export function useDrag({
  onDrag,
  onDragStart,
  dragThreshold = 0,
}: DragHookProps) {
  const [dragging, setDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(
    null
  );
  const startMousePos = useRef({ x: 0, y: 0 });
  const previousMousePos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    startMousePos.current = { x: e.clientX, y: e.clientY };
    previousMousePos.current = { x: e.clientX, y: e.clientY };
    setDraggedElement(e.currentTarget as HTMLElement);
    hasDragged.current = false;
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;

      const deltaX = e.clientX - previousMousePos.current.x;
      const deltaY = e.clientY - previousMousePos.current.y;
      const totalX = e.clientX - startMousePos.current.x;
      const totalY = e.clientY - startMousePos.current.y;

      if (
        !hasDragged.current &&
        Math.sqrt(totalX ** 2 + totalY ** 2) >= dragThreshold
      ) {
        hasDragged.current = true;
        if (draggedElement) {
          draggedElement.style.pointerEvents = "none";
        }
        onDragStart?.({
          startX: startMousePos.current.x,
          startY: startMousePos.current.y,
          target: draggedElement,
        });
      }

      if (hasDragged.current) {
        onDrag({ deltaX: deltaX, deltaY: deltaY });
      }

      previousMousePos.current = { x: e.clientX, y: e.clientY };
    },
    [dragging, onDrag, onDragStart, draggedElement, dragThreshold]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
    if (draggedElement) {
      draggedElement.style.pointerEvents = "";
    }
  }, [draggedElement, dragging]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return { onMouseDown, onDrag, onDragStart };
}
