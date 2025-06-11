import { Draggable } from "./Draggable";
import { Resizable } from "./Resizable";
import { Position, Size } from "./types";

export default function Frame({
  zoom,
  posX,
  posY,
  width,
  height,
  className,
  draggable = true,
  resizable = true,
  aspectRatio,
  showHandles = true,
  rotation = 0,
  onMove,
  onResize,
  children,
}: {
  zoom: number;
  posX: number;
  posY: number;
  width: number;
  height: number;
  draggable?: boolean;
  resizable?: boolean;
  aspectRatio?: number;
  showHandles?: boolean;
  rotation?: number;
  onMove?: (pos: Position) => void;
  onResize?: (size: Size) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Draggable
      position={{ x: posX, y: posY }}
      onMove={onMove}
      zoom={zoom}
      disabled={!draggable}
      className={className}
      style={{
        rotate: `${rotation}deg`,
        width: "min-content",
      }}
    >
      <Resizable
        size={{ width, height }}
        position={{ x: posX, y: posY }}
        zoom={zoom}
        resizable={resizable}
        aspectRatio={aspectRatio}
        showHandles={showHandles}
        onResize={onResize}
        onMove={onMove}
      >
        {children}
      </Resizable>
    </Draggable>
  );
}
