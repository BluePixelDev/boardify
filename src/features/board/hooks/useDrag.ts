import { useCallback, useEffect, useRef, useState } from "react";

// --- TypeScript types for drag operations ---
export type DragDelta = {
  deltaX: number;
  deltaY: number;
};

export type DragStartInfo = {
  startX: number;
  startY: number;
  target: HTMLElement | null;
};

export type OnDrag = (delta: DragDelta) => void;
export type OnDragStart = (info: DragStartInfo) => boolean;
export type OnDragEnd = () => void;

/**
 * Configuration for the useDrag hook.
 */
interface DragHookProps {
  onDragStart?: OnDragStart;
  onDrag: OnDrag;
  onDragEnd?: OnDragEnd;
  dragThreshold?: number;
  mouseButton?: number;
}

/**
 * useDrag hook
 *
 * Manages dragging logic for an element. Call onDragStart when movement exceeds threshold,
 * onDrag on each move afterward, and onDragEnd when drag finishes.
 */
export function useDrag({
  onDragStart,
  onDrag,
  onDragEnd,
  dragThreshold = 0,
  mouseButton,
}: DragHookProps) {
  const [dragging, setDragging] = useState(false);
  const startRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRef = useRef<HTMLElement | null>(null);
  const hasStarted = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (mouseButton != null && e.button !== mouseButton) return;
      targetRef.current = e.currentTarget as HTMLElement;
      startRef.current = { x: e.clientX, y: e.clientY };
      prevRef.current = { x: e.clientX, y: e.clientY };
      hasStarted.current = false;
      setDragging(true);
    },
    [mouseButton]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      const totalX = e.clientX - startRef.current.x;
      const totalY = e.clientY - startRef.current.y;

      if (!hasStarted.current && Math.hypot(totalX, totalY) >= dragThreshold) {
        hasStarted.current = true;
        const proceed = onDragStart
          ? onDragStart({
              startX: startRef.current.x,
              startY: startRef.current.y,
              target: targetRef.current,
            })
          : true;
        if (!proceed) {
          setDragging(false);
          return;
        }
        if (targetRef.current) targetRef.current.style.pointerEvents = "none";
      }

      if (hasStarted.current) {
        const deltaX = e.clientX - prevRef.current.x;
        const deltaY = e.clientY - prevRef.current.y;
        onDrag({ deltaX, deltaY });
        prevRef.current = { x: e.clientX, y: e.clientY };
      }
    },
    [dragging, dragThreshold, onDrag, onDragStart]
  );

  const onMouseUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (hasStarted.current) {
      onDragEnd?.();
      if (targetRef.current) targetRef.current.style.pointerEvents = "";
    }
  }, [dragging, onDragEnd]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return { onMouseDown };
}
