import React from "react";
import "./selection.styles.css";

type ResizeHandleProps = {
  className?: string;
  direction: string;
  width: number;
  height: number;
  onMouseDown: (event: React.MouseEvent, direction: string) => void;
};

export function ResizeHandle({
  className,
  direction,
  width,
  height,
  onMouseDown,
}: ResizeHandleProps) {
  return (
    <div
      className={`resize-handle handle-${direction} ${className ?? ""}`}
      style={{
        width,
        height,
        cursor: `${direction}-resize`,
      }}
      onMouseDown={(e) => onMouseDown(e, direction)}
    />
  );
}
