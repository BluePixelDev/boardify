import { Point } from "@/utils";
import { RefObject, useCallback, useEffect, useReducer, useRef } from "react";

interface SelectionLayerProps {
  containerRef: RefObject<HTMLDivElement>;
  onSelectionChange?: (rect: DOMRect) => void;
}

type SelectionState = {
  isSelecting: boolean;
  start: Point | null;
  end: Point | null;
};

type SelectionAction =
  | { type: "START_SELECTION"; payload: Point }
  | { type: "UPDATE_SELECTION"; payload: Point }
  | { type: "END_SELECTION" };

function selectionReducer(
  state: SelectionState,
  action: SelectionAction
): SelectionState {
  switch (action.type) {
    case "START_SELECTION":
      return { isSelecting: true, start: action.payload, end: action.payload };
    case "UPDATE_SELECTION":
      return state.isSelecting ? { ...state, end: action.payload } : state;
    case "END_SELECTION":
      return { isSelecting: false, start: null, end: null };
    default:
      return state;
  }
}

export function SelectionLayer({
  containerRef,
  onSelectionChange,
}: SelectionLayerProps) {
  const [state, dispatch] = useReducer(selectionReducer, {
    isSelecting: false,
    start: null,
    end: null,
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const onMouseMoveRef = useRef<(e: MouseEvent) => void>();
  const onMouseUpRef = useRef<(e: MouseEvent) => void>();

  const clearSelection = useCallback(() => {
    dispatch({ type: "END_SELECTION" });

    window.removeEventListener("mousemove", onMouseMoveRef.current!);
    window.removeEventListener("mouseup", onMouseUpRef.current!);
    onMouseMoveRef.current = undefined;
    onMouseUpRef.current = undefined;
  }, []);

  const startSelection = useCallback(
    (startPoint: Point) => {
      dispatch({ type: "START_SELECTION", payload: startPoint });

      const handleMouseMove = (e: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        dispatch({ type: "UPDATE_SELECTION", payload: { x, y } });

        const { start } = stateRef.current;
        if (start && onSelectionChange) {
          const sx = Math.min(start.x, x);
          const sy = Math.min(start.y, y);
          const sw = Math.abs(x - start.x);
          const sh = Math.abs(y - start.y);
          onSelectionChange(new DOMRect(sx, sy, sw, sh));
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        handleMouseMove(e); // final update
        clearSelection();
      };

      onMouseMoveRef.current = handleMouseMove;
      onMouseUpRef.current = handleMouseUp;

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [containerRef, onSelectionChange, clearSelection]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (
        target.closest(".board-node") || // don't start on nodes
        target.closest(".no-selection-layer") // don't start on resize handles, etc.
      ) {
        return;
      }

      e.preventDefault();

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      startSelection({ x, y });
    },
    [containerRef, startSelection]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousedown", handleMouseDown);
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
    };
  }, [containerRef, handleMouseDown]);

  if (!state.isSelecting || state.start === null || state.end === null) {
    return null;
  }

  const { start, end } = state;

  return (
    <div
      className="selection-rect"
      style={{
        position: "absolute",
        left: Math.min(start.x, end.x),
        top: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
      }}
    />
  );
}
