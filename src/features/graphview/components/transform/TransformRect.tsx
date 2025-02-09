import React, { CSSProperties, MouseEventHandler, useCallback, useMemo, useState } from "react";
import ResizeHandle from "./ResizeHandle";
import { useDrag, useResize } from "../../hooks";
import { GraphNodePosition, GraphNodeSize } from "../../types";

type TransformRectProps = {
    zoom: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    draggable?: boolean;
    resizable?: boolean;
    aspectRatio?: number;
    minWidth?: number;
    minHeight?: number;
    onMove?: (position: { x: number; y: number }) => void;
    onResize?: (size: { width: number; height: number }) => void;
    children: React.ReactNode;
};

type Directions = "se" | "ne" | "sw" | "nw";
const RESIZE_HANDLE_SIZE = 8;
const MIN_DIMENSION = 10;

export default function TransformRect(props: TransformRectProps) {
    const {
        zoom,
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        aspectRatio,
        minWidth = MIN_DIMENSION,
        minHeight = MIN_DIMENSION,
        resizable = true,
        draggable = true,
        onMove,
        onResize,
        children,
    } = props;

    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

    const updatePosition = useCallback((pos: GraphNodePosition) => {
        setPosition(pos);
        onMove?.(pos)
    }, [setPosition])

    const updateSize = useCallback((size: GraphNodeSize) => {
        setSize(size);
        onResize?.(size)
    }, [setPosition])

    const memoizedInitialPosition = useMemo(() => ({ x: initialX, y: initialY }), [initialX, initialY]);
    const memoizedInitialSize = useMemo(() => ({ width: initialWidth, height: initialHeight }), [initialWidth, initialHeight]);
    const { onMouseDown: onDragMouseDown } = useDrag({
        zoom,
        onMove: (newPos) => {
            updatePosition(newPos);
            onMove?.(newPos);
        },
        initialPosition: memoizedInitialPosition,
        draggable,
    });

    const { onMouseDownResize } = useResize({
        zoom,
        aspectRatio,
        minWidth,
        minHeight,
        onResize: (newSize, newPos) => {
            updateSize(newSize)
            updatePosition(newPos)
        },
        initialSize: memoizedInitialSize,
        initialPosition: memoizedInitialPosition,
        resizable,
    });

    const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.button != 0) return;
        onDragMouseDown(event)
    }, [onDragMouseDown])

    const containerStyle: CSSProperties = {
        position: "absolute",
        pointerEvents: "all",
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: size.width,
        height: size.height,
    };

    return (
        <div style={containerStyle} onMouseDown={handleDrag}>
            {children}
            {resizable &&
                (["se", "ne", "sw", "nw"] as Directions[]).map((direction) => (
                    <ResizeHandle
                        key={direction}
                        direction={direction}
                        style={{
                            position: "absolute",
                            ...(direction.includes("e") ? { right: 0 } : { left: 0 }),
                            ...(direction.includes("s") ? { bottom: 0 } : { top: 0 }),
                        }}
                        width={RESIZE_HANDLE_SIZE / zoom}
                        height={RESIZE_HANDLE_SIZE / zoom}
                        onMouseDown={(e) => onMouseDownResize(e, direction)}
                    />
                ))}
        </div>
    );
}
