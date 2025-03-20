import React, { CSSProperties, useCallback, useRef, WheelEventHandler, MouseEventHandler } from 'react';
import GraphGrid from './GraphGrid';
import "../graphStyles.css";
import { useDrag } from '../hooks';
import { useGraphViewContext } from '../context/GraphViewContext';

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

  const { setZoom, setPosition, position, zoom, transform } = useGraphViewContext();

  const handleWheel: WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mousePosition = { x: e.clientX - containerRect.left, y: e.clientY - containerRect.top };

    const factor = 1 - 0.1 * Math.sign(e.deltaY);
    const newZoom = zoom * factor;

    const worldX = (mousePosition.x - position.x) / zoom;
    const worldY = (mousePosition.y - position.y) / zoom;

    const newPosition = {
      x: mousePosition.x - worldX * newZoom,
      y: mousePosition.y - worldY * newZoom
    };

    setZoom(newZoom);
    setPosition(newPosition);
  }, [minZoom, maxZoom, setPosition, setZoom]);

  const { onMouseDown: onDragMouseDown } = useDrag({
    zoom: 1,
    position: position,
    draggable: true,
    onMove: (newPosition) => setPosition(newPosition),
  });

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 1) return;
    onDragMouseDown(event);
  }, [onDragMouseDown]);

  const contentStyle: CSSProperties = {
    transform: `matrix(${transform.matrix[0]}, ${transform.matrix[1]}, ${transform.matrix[2]}, ${transform.matrix[3]}, ${transform.matrix[4]}, ${transform.matrix[5]})`,
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
