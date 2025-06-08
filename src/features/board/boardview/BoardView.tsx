import { useAppDispatch, useAppSelector } from "@/store";
import React, {
  CSSProperties,
  MouseEventHandler,
  useCallback,
  useRef,
} from "react";
import { setPosition, setTransform } from "../store";
import "./board.styles.css";
import { useDrag } from "./hooks";
import { DragDelta } from "./hooks/useDrag";
import { useZoom, ZoomInfo } from "./hooks/useZoom";
import { zoomAtPoint } from "./matrixUtils";
import { SelectionArea } from "./SelectionArea";

//==== GRAPHVIEW ====
export type GraphViewProps = {
  minZoom?: number;
  maxZoom?: number;
  grid?: React.ReactNode;
  children?: React.ReactNode;
  overlay?: React.ReactNode;
};

export default function BoardView({
  grid,
  children,
  overlay,
  minZoom = 0.1,
  maxZoom = 1,
}: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { position, transform } = useAppSelector(
    (state) => state.graph.graphView
  );

  const handleZoom = useCallback(
    ({ scaleFactor, mouseX, mouseY }: ZoomInfo) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mousePosition = {
        x: mouseX - containerRect.left,
        y: mouseY - containerRect.top,
      };

      const newTransform = zoomAtPoint(transform, scaleFactor, mousePosition);
      dispatch(setTransform(newTransform));
    },
    [dispatch, transform]
  );

  const onDragMove = (delta: DragDelta) => {
    dispatch(
      setPosition({
        x: position.x + delta.deltaX,
        y: position.y + delta.deltaY,
      })
    );
  };

  const { onMouseDown } = useDrag({ onDrag: onDragMove });
  const { onWheel } = useZoom({
    onZoom: handleZoom,
    minZoom,
    maxZoom,
    zoomSpeed: 0.1,
  });

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.button !== 1) return;
      onMouseDown(event);
    },
    [onMouseDown]
  );

  const contentStyle: CSSProperties = {
    transform: `matrix(${transform.join(", ")})`,
  };

  return (
    <div
      ref={containerRef}
      className="graph-view"
      onWheel={onWheel}
      onMouseDown={handleDrag}
    >
      <div className="graph-view__grid">{grid}</div>
      <SelectionArea containerRef={containerRef} />

      <div className="graph-view__content" style={contentStyle}>
        {children}
      </div>

      <div className="graph-view__overlay">{overlay}</div>
    </div>
  );
}
