import { useAppDispatch } from "@/redux";
import "./board.styles.css";
import { useRef } from "react";
import { SelectionLayer } from "../selection/SelectionLayer";
import { useViewport } from "@/hooks";
import { Viewport } from "../viewport/Viewport";
import { selectNodesInRect } from "../../store";

export type GraphViewProps = {
  grid?: React.ReactNode;
  children?: React.ReactNode;
  overlay?: React.ReactNode;
};

export default function BoardView({ grid, children, overlay }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { position, zoom } = useViewport();

  const handleSelection = (rect: DOMRect) => {
    dispatch(
      selectNodesInRect({
        x: (rect.x - position.x) / zoom,
        y: (rect.y - position.y) / zoom,
        width: rect.width / zoom,
        height: rect.height / zoom,
      })
    );
  };

  return (
    <div ref={containerRef} className="board-view">
      <SelectionLayer
        containerRef={containerRef}
        onSelectionChange={handleSelection}
      />

      <div className="board-view__grid">{grid}</div>
      <Viewport>
        <div className="board-view__content">{children}</div>
      </Viewport>

      <div className="board-view__overlay">{overlay}</div>
    </div>
  );
}
