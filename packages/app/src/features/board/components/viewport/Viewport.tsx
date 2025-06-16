import React, { useCallback, useRef } from "react";
import { useZoom, useDrag, ZoomInfo, useViewport } from "@/hooks";
import { zoomAtPoint } from "@/utils/matrixUtils";
import "./viewport.styles.css";

export const Viewport: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { position, transform, setTransform, setPosition } = useViewport();

  const onZoom = useCallback(
    ({ scaleFactor, mouseX, mouseY }: ZoomInfo) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const point = { x: mouseX - rect.left, y: mouseY - rect.top };
      setTransform(zoomAtPoint(transform, scaleFactor, point));
    },
    [transform]
  );

  const { onWheel } = useZoom({ onZoom, minZoom: 0.1, maxZoom: 2 });
  const { onMouseDown } = useDrag({
    onDrag: (delta) => {
      setPosition({
        x: position.x + delta.deltaX,
        y: position.y + delta.deltaY,
      });
    },
  });

  return (
    <div
      ref={containerRef}
      className="viewport"
      onWheel={onWheel}
      onMouseDown={(e) => e.button === 1 && onMouseDown(e)}
    >
      <div
        className="viewport__content"
        style={{ transform: `matrix(${transform.join(",")})` }}
      >
        {children}
      </div>
    </div>
  );
};
