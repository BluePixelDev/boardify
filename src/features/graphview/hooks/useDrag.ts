import { useCallback, useEffect, useRef, useState } from "react";

type DragResult = {
  position: { x: number; y: number };
  onMouseDown: (e: React.MouseEvent) => void;
};

export function useDrag({
  zoom,
  onMove,
  initialPosition,
  draggable,
}: {
  zoom: number;
  onMove?: (position: { x: number; y: number }) => void;
  initialPosition: { x: number; y: number };
  draggable: boolean;
}): DragResult {
  const [position, setPosition] = useState(initialPosition);
  const draggingRef = useRef(false);
  const startMousePos = useRef({ x: 0, y: 0 });
  const startPos = useRef(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);


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
      const deltaX = e.clientX - startMousePos.current.x;
      const deltaY = e.clientY - startMousePos.current.y;
      const newPos = {
        x: startPos.current.x + deltaX / zoom,
        y: startPos.current.y + deltaY / zoom,
      };
      setPosition(newPos);
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
