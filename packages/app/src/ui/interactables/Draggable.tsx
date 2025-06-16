import React, { CSSProperties, MouseEventHandler, useCallback } from "react";
import { useDrag, DragDelta } from "@/hooks/useDrag";
import { Position } from "./types";

interface DraggableProps {
  position: Position;
  onMove?: (position: Position) => void;
  zoom: number;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Draggable({
  position,
  onMove,
  zoom = 1,
  disabled = false,
  children,
  className,
  style,
}: DraggableProps) {
  const onDragMove = useCallback(
    (drag: DragDelta) => {
      if (disabled) return;
      onMove?.({
        x: position.x + drag.deltaX / zoom,
        y: position.y + drag.deltaY / zoom,
      });
    },
    [disabled, onMove, position]
  );

  const { onMouseDown } = useDrag({
    onDrag: onDragMove,
    dragThreshold: 10,
  });

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0) return;
    onMouseDown(event);
  };

  const transformStyle: CSSProperties = {
    transform: `translate3d(${Math.round(position.x)}px, ${Math.round(position.y)}px, 0)`,
    ...style,
  };

  return (
    <div
      className={`draggable ${className ?? ""}`}
      style={transformStyle}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
