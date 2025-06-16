import { useAppDispatch, useAppSelector } from "@/redux";
import { setViewPosition, setViewTransform, setViewZoom } from "..";

export function useViewport() {
  const view = useAppSelector((state) => state.board.view);
  const dispatch = useAppDispatch();

  const setTransform = (value: number[]) => {
    dispatch(setViewTransform(value));
  };

  const setZoom = (zoom: number) => {
    dispatch(setViewZoom(zoom));
  };
  const setPosition = (position: { x: number; y: number }) => {
    dispatch(setViewPosition(position));
  };

  return {
    ...view,
    setTransform,
    setZoom,
    setPosition,
  };
}
