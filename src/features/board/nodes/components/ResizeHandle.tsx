import React from "react";

type ResizeHandleProps = {
  className?: string;
  direction: string;
  width: number;
  height: number;
  onMouseDown: (event: React.MouseEvent, direction: string) => void;
};

export default function ResizeHandle({
  className,
  direction,
  width,
  height,
  onMouseDown,
}: ResizeHandleProps) {
  return (
    <div
      className={`interact-handle handle-${direction} ${className ?? ""}`}
      style={{
        width,
        height,
        cursor: `${direction}-resize`,
      }}
      onMouseDown={(e) => onMouseDown(e, direction)}
    />
  );
}
