import React, {
  CSSProperties,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEventHandler,
  MouseEventHandler,
} from 'react';
import GridBackground from '../grid/BoardGrid';
import './graphview.css';
import { useDrag } from '../../hooks';

//
// TYPES & DEFAULTS
//
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

interface GraphViewContextType {
  zoom: number;
  translate: { x: number; y: number };
  updatePosition: (delta: { x: number; y: number }) => void;
  updateScale: (delta: number, mousePosition?: { x: number; y: number }) => void;
}

const GraphViewContext = createContext<GraphViewContextType>({
  zoom: 1,
  translate: { x: 0, y: 0 },
  updatePosition: () => { },
  updateScale: () => { },
});

export const useGraphViewContext = () => useContext(GraphViewContext);

// Default configuration values
const DEFAULT_SMOOTHING_FACTOR = 0.8;
const DEFAULT_EPSILON = 0.5;
const DEFAULT_MIN_ZOOM = 0.1;
const DEFAULT_MAX_ZOOM = 10;

//
// COMPONENT: GraphView
//
export default function GraphView({ children, graph }: GraphViewProps) {
  const minZoom = graph?.minZoom ?? DEFAULT_MIN_ZOOM;
  const maxZoom = graph?.maxZoom ?? DEFAULT_MAX_ZOOM;
  const smoothingFactor = graph?.smoothingFactor ?? DEFAULT_SMOOTHING_FACTOR;
  const epsilon = graph?.epsilon ?? DEFAULT_EPSILON;

  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [targetTranslate, setTargetTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the target translation by adding the given delta.
  const updatePosition = useCallback((delta: { x: number; y: number }) => {
    setTargetTranslate((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  }, []);

  // Immediately set both the target and current translations.
  const updatePositionImmediate = useCallback((newPosition: { x: number; y: number }) => {
    setTargetTranslate(newPosition);
    setTranslate(newPosition);
  }, []);

  // Update zoom while keeping the point under the mouse fixed.
  const updateScale = useCallback(
    (delta: number, mousePosition?: { x: number; y: number }) => {
      if (!containerRef.current) return;

      setZoom((prevZoom) => {
        if (!mousePosition || !containerRef.current) return prevZoom;
        const newZoom = Math.max(minZoom, Math.min(maxZoom, prevZoom + delta));
        const zoomFactor = newZoom / prevZoom;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = mousePosition.x - rect.left;
        const mouseY = mousePosition.y - rect.top;
        const newX = targetTranslate.x - (mouseX - targetTranslate.x) * (zoomFactor - 1);
        const newY = targetTranslate.y - (mouseY - targetTranslate.y) * (zoomFactor - 1);
        updatePositionImmediate({ x: newX, y: newY });

        return newZoom;
      });
    },
    [minZoom, maxZoom, targetTranslate, updatePositionImmediate]
  );

  const { onMouseDown: onDragMouseDown } = useDrag({
    zoom: 1,
    initialPosition: translate,
    draggable: true,
    onMove: (newPosition) => {
      setTargetTranslate(newPosition);
    },
  });

  const handleWheel: WheelEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const delta = Math.sign(event.deltaY) * -0.1;
      updateScale(delta, { x: event.clientX, y: event.clientY });
    },
    [updateScale]
  );

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 1) return;
    onDragMouseDown(event);
  }, [onDragMouseDown]);

  // Smoothly animate translate changes toward the target translation.
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setTranslate((prev) => {
        const dx = targetTranslate.x - prev.x;
        const dy = targetTranslate.y - prev.y;
        if (Math.abs(dx) < epsilon && Math.abs(dy) < epsilon) {
          return targetTranslate;
        }
        return {
          x: prev.x + dx * smoothingFactor,
          y: prev.y + dy * smoothingFactor,
        };
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (
      Math.abs(targetTranslate.x - translate.x) >= epsilon ||
      Math.abs(targetTranslate.y - translate.y) >= epsilon
    ) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetTranslate, smoothingFactor, epsilon, translate.x, translate.y]);

  const contextValue = useMemo(
    () => ({
      zoom,
      translate,
      updatePosition,
      updateScale,
    }),
    [zoom, translate, updatePosition, updateScale]
  );

  const contentStyle: CSSProperties = {
    transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${zoom})`,
    transformOrigin: '0 0',
  };

  return (
    <GraphViewContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className="graph-view"
        onWheel={handleWheel}
        onMouseDown={handleDrag}
      >
        <GridBackground />
        <div className="graph-view-content" style={contentStyle}>
          {children}
        </div>
      </div>
    </GraphViewContext.Provider>
  );
}
