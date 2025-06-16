import { DIRECTIONS, useNode, useResize, useViewport } from "@/hooks";
import { ResizeHandle } from "./ResizeHandle";

const HANDLE_MIN_SIZE_PX = 6;
const HANDLE_MAX_SIZE_PX = 12;
const OUTLINE_MIN_PX = 1;
const OUTLINE_MAX_PX = 2;

function getHandleSize(zoom: number): number {
  const baseSize = 10;
  const scale = 1 / zoom;
  const size = baseSize * Math.pow(scale, 0.6);
  return Math.min(HANDLE_MAX_SIZE_PX, Math.max(HANDLE_MIN_SIZE_PX, size));
}

function getOutlineWidth(zoom: number): number {
  const baseWidth = 1;
  const scale = 1 / zoom;
  const width = baseWidth * Math.pow(scale, 0.7);
  return Math.min(OUTLINE_MAX_PX, Math.max(OUTLINE_MIN_PX, width));
}
export function OverlayHandles({ nodeId }: { nodeId: string }) {
  const { zoom, position } = useViewport();
  const { node, move, resize, aspectRatio } = useNode(nodeId);

  if (!node) return null;

  const handleSize = getHandleSize(zoom);

  const { onMouseDownResize } = useResize({
    zoom,
    aspectRatio,
    minWidth: 40,
    minHeight: 40,
    maxWidth: 2000,
    maxHeight: 2000,
    size: node.size,
    position: node.position,
    resizable: true,
    onMove: (pos) => move(pos),
    onResize: (size) => resize(size),
  });

  const left = node.position.x * zoom + position.x;
  const top = node.position.y * zoom + position.y;
  const width = node.size.width * zoom;
  const height = node.size.height * zoom;

  return (
    <div
      className="resize-handles__wrapper no-selection-layer"
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        outline: `${getOutlineWidth(zoom)}px solid var(--accent-color)`,
        pointerEvents: "none",
      }}
    >
      {DIRECTIONS.map((dir) => (
        <ResizeHandle
          key={dir}
          direction={dir}
          width={handleSize}
          height={handleSize}
          onMouseDown={(e) => onMouseDownResize(e, dir)}
        />
      ))}
    </div>
  );
}
