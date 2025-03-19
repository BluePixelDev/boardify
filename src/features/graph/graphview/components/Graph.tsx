import React, { CSSProperties, useCallback, useEffect, useRef, useState, WheelEventHandler, MouseEventHandler, useLayoutEffect } from 'react';
import GraphGrid from './GraphGrid';
import "../graphStyles.css";
import { useDrag } from '../hooks';
import { useGraphViewContext } from './transform/GraphViewContext';

// TYPES & DEFAULTS
export type GraphProperties = {
  minZoom: number;
  maxZoom: number;
  smoothingFactor?: number;
  epsilon?: number;
};

export type GraphViewProps = {
  children?: React.ReactNode;
  graph?: GraphProperties;
};

const DEFAULT_MIN_ZOOM = 0.1;
const DEFAULT_MAX_ZOOM = 10;

export default function Graph({ children, graph }: GraphViewProps) {
  const minZoom = graph?.minZoom ?? DEFAULT_MIN_ZOOM;
  const maxZoom = graph?.maxZoom ?? DEFAULT_MAX_ZOOM;
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { setPosition, setZoom, targetPosition, position, zoom } = useGraphViewContext();

  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Update zoom while keeping the point under the mouse fixed.
  const updateZoom = useCallback(
    (delta: number, mousePosition?: { x: number; y: number }) => {
      if (!containerRef.current) return;

      setZoom((prevZoom) => {
        const newZoom = Math.max(minZoom, Math.min(maxZoom, prevZoom * (1 + delta)));
        if (!mousePosition || !containerRef.current) return newZoom;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = mousePosition.x - rect.left;
        const mouseY = mousePosition.y - rect.top;

        const worldMouseX = (mouseX + position.x) / prevZoom;
        const worldMouseY = (mouseY + position.y) / prevZoom;

        const newTargetPosition = {
          x: mouseX - worldMouseX * newZoom,
          y: mouseY - worldMouseY * newZoom,
        };

        setPosition((prevPosition) => {
          return {
            x: prevPosition.x + (newTargetPosition.x - prevPosition.x),
            y: prevPosition.y + (newTargetPosition.y - prevPosition.y),
          };
        });
        return newZoom;
      });
    },
    [minZoom, maxZoom, targetPosition, setZoom, setPosition]
  );

  const { onMouseDown: onDragMouseDown } = useDrag({
    zoom: 1,
    position: position,
    draggable: true,
    onMove: (newPosition) => {
      setPosition(newPosition);
    },
  });

  // New wheel handler that adjusts the translation to keep the point under the mouse fixed
  const handleWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!containerRef.current) return;

      // Prevent default scrolling behavior
      e.preventDefault();

      // Get container's bounding box to compute mouse coordinates relative to it
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      // Determine scaling factor from the wheel delta
      const factor = 1 - 0.1 * Math.sign(e.deltaY);

      // Update zoom and adjust the translation so the mouse point stays fixed
      setZoom(prevZoom => {
        const newZoom = Math.max(minZoom, Math.min(maxZoom, prevZoom * factor));
        setPosition(prevPos => ({
          x: prevPos.x + (1 - newZoom / prevZoom) * (mouseX - prevPos.x),
          y: prevPos.y + (1 - newZoom / prevZoom) * (mouseY - prevPos.y),
        }));
        return newZoom;
      });
    },
    [minZoom, maxZoom, setZoom, setPosition]
  );

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 1) return;
    onDragMouseDown(event);
  }, [onDragMouseDown]);

  const contentStyle: CSSProperties = {
    transform: `translate3d(${Math.round(position.x)}px, ${Math.round(position.y)}px, 0) scale(${zoom})`,
  };

  return (
    <div
      ref={containerRef}
      className="graph-view"
      onWheel={handleWheel}
      onMouseDown={handleDrag}
    >
      <GraphGrid />
      <div className="graph-view-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
