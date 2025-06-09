import React, { CSSProperties, useReducer, RefObject } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux";
import "./board.styles.css";
import { DragDelta, DragStartInfo, useDrag } from "../../hooks/useDrag";
import { selectNodesInRect } from "../../slices";

type Point = { x: number; y: number };

type SelectionState = {
  isSelecting: boolean;
  start: Point | null;
  end: Point | null;
};

type SelectionAction =
  | { type: "START_SELECTION"; payload: Point }
  | { type: "UPDATE_SELECTION"; payload: Point }
  | { type: "END_SELECTION" };

/**
 * Reducer managing the drag-selection rectangle state.
 */
function selectionReducer(
  state: SelectionState,
  action: SelectionAction
): SelectionState {
  switch (action.type) {
    case "START_SELECTION":
      return { isSelecting: true, start: action.payload, end: action.payload };
    case "UPDATE_SELECTION":
      if (!state.isSelecting) return state;
      return { ...state, end: action.payload };
    case "END_SELECTION":
      return { isSelecting: false, start: null, end: null };
    default:
      return state;
  }
}

interface SelectionAreaProps {
  /** Container element reference to compute bounds */
  containerRef: RefObject<HTMLDivElement>;
}

/**
 * Renders a user-drag selection rectangle and dispatches world-space node selection.
 */
export const SelectionArea: React.FC<SelectionAreaProps> = ({
  containerRef,
}) => {
  const reduxDispatch = useDispatch();
  const { position, zoom } = useAppSelector((s) => s.board.view);
  const [state, localDispatch] = useReducer(selectionReducer, {
    isSelecting: false,
    start: null,
    end: null,
  });

  /**
   * Initializes selection if click starts on empty graph area.
   */
  const onStart = (info: DragStartInfo) => {
    if (!containerRef.current) return false;
    if ((info.target as HTMLElement).closest(".graph-node")) return false;
    const { left, top } = containerRef.current.getBoundingClientRect();
    localDispatch({
      type: "START_SELECTION",
      payload: { x: info.startX - left, y: info.startY - top },
    });
    return true;
  };

  /**
   * Updates selection rectangle and dispatches node intersection action in world coords.
   */
  const onDrag = (delta: DragDelta) => {
    if (!containerRef.current || !state.start) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    let endX = state.end!.x + delta.deltaX;
    let endY = state.end!.y + delta.deltaY;
    endX = Math.max(0, Math.min(width, endX));
    endY = Math.max(0, Math.min(height, endY));

    localDispatch({ type: "UPDATE_SELECTION", payload: { x: endX, y: endY } });

    const sx = Math.min(state.start.x, endX);
    const sy = Math.min(state.start.y, endY);
    const sw = Math.abs(endX - state.start.x);
    const sh = Math.abs(endY - state.start.y);

    reduxDispatch(
      selectNodesInRect({
        x: (sx - position.x) / zoom,
        y: (sy - position.y) / zoom,
        width: sw / zoom,
        height: sh / zoom,
      })
    );
  };

  /**
   * Ends selection and clears rectangle.
   */
  const onEnd = () => {
    if (state.isSelecting) localDispatch({ type: "END_SELECTION" });
  };

  const { onMouseDown } = useDrag({
    onDragStart: onStart,
    onDrag,
    onDragEnd: onEnd,
    mouseButton: 0,
  });

  // Compute inline style for selection rectangle
  const rectStyle: CSSProperties | undefined =
    state.start && state.end
      ? {
          left: Math.min(state.start.x, state.end.x),
          top: Math.min(state.start.y, state.end.y),
          width: Math.abs(state.end.x - state.start.x),
          height: Math.abs(state.end.y - state.start.y),
        }
      : undefined;

  return (
    <div className="selection-container" onMouseDown={onMouseDown}>
      {state.isSelecting && rectStyle && (
        <div className="selection-rect" style={rectStyle} />
      )}
    </div>
  );
};
