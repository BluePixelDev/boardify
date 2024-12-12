import { useDragContext } from "@/shared/context/DragProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import ResizeHandle from "./ResizeHandle";

type TransformRectProps = {
    zoom: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
    draggable?: boolean;
    resizable?: boolean;
    aspectRatio?: number; // Add aspectRatio prop
    onMove?: (position: { x: number; y: number }) => void;
    onResize?: (size: { width: number; height: number }) => void;
    children: React.ReactNode;
};

const RESIZE_HANDLE_SIZE = 8;

export default function TransformRect(props: TransformRectProps) {
    const [position, setPosition] = useState({
        x: props.initialX,
        y: props.initialY,
    });

    const [size, setSize] = useState({
        width: props.initialWidth,
        height: props.initialHeight,
    });

    const dragContext = useDragContext();
    const transformRef = useRef<HTMLDivElement>(null);
    const resizingRef = useRef({ isResizing: false, direction: '' });
    const startSizeRef = useRef({ width: size.width, height: size.height });
    const startMousePositionRef = useRef({ x: 0, y: 0 });
    const startPositionRef = useRef({ x: 0, y: 0 });

    // Dragging Logic
    useEffect(() => {
        if (dragContext.startTarget !== transformRef.current) return;
        if (dragContext.originalEvent?.button !== 0) return;

        const newPosition = {
            x: position.x + dragContext.mouse.deltaX / props.zoom,
            y: position.y + dragContext.mouse.deltaY / props.zoom
        };

        setPosition(newPosition);
        props.onMove?.(newPosition);
    }, [dragContext, props.zoom]);

    // Resizing Logic
    const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
        if (!props.resizable) return;

        resizingRef.current = { isResizing: true, direction };
        startMousePositionRef.current = { x: e.clientX, y: e.clientY };
        startPositionRef.current = { x: position.x, y: position.y };
        startSizeRef.current = { width: size.width, height: size.height };
        e.preventDefault();
    };

    const handleMouseMoveResize = useCallback((e: MouseEvent) => {
        if (!resizingRef.current.isResizing) return;

        const { x, y } = startMousePositionRef.current;
        const deltaX = e.clientX - x;
        const deltaY = e.clientY - y;

        let newPosition = { ...position };
        let newSize = { ...size };

        // Resizing logic for different directions
        switch (resizingRef.current.direction) {
            case 'se':
                newSize = {
                    width: startSizeRef.current.width + deltaX / props.zoom,
                    height: startSizeRef.current.height + deltaY / props.zoom
                };
                break;
            case 'ne':
                newSize = {
                    width: startSizeRef.current.width + deltaX / props.zoom,
                    height: startSizeRef.current.height - deltaY / props.zoom
                };
                newPosition.y = startPositionRef.current.y + deltaY / props.zoom;
                break;
            case 'sw':
                newSize ={
                    width: startSizeRef.current.width - deltaX / props.zoom,
                    height: startSizeRef.current.height + deltaY / props.zoom
                };
                newPosition.x = startPositionRef.current.x + deltaX / props.zoom;
                break;
            case 'nw':
                newSize = {
                    width: startSizeRef.current.width - deltaX / props.zoom,
                    height: startSizeRef.current.height - deltaY / props.zoom
                };
                newPosition.x = startPositionRef.current.x + deltaX / props.zoom;
                newPosition.y = startPositionRef.current.y + deltaY / props.zoom;
                break;
        }

        if (props.aspectRatio) {
            if (newSize.width / newSize.height > props.aspectRatio) {
                newSize.width = newSize.height * props.aspectRatio;
            } else {
                newSize.height = newSize.width / props.aspectRatio;
            }
        }

        setSize(newSize);
        setPosition(newPosition);
        props.onResize?.(newSize);
    }, [props.zoom, size, position, props.aspectRatio]);

    const handleMouseUpResize = () => {
        resizingRef.current = { isResizing: false, direction: '' };
    };

    // Event Listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMoveResize);
        window.addEventListener('mouseup', handleMouseUpResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveResize);
            window.removeEventListener('mouseup', handleMouseUpResize);
        };
    }, [handleMouseMoveResize]);

    // Apply transformations
    useEffect(() => {
        if (!transformRef.current) return;
        transformRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
        transformRef.current.style.width = `${size.width}px`;
        transformRef.current.style.height = `${size.height}px`;
    }, [position, size]);

    return (
        <div
            ref={transformRef}
            className="transform-rect"
            style={{
                position: "absolute",
                pointerEvents: "all",
            }}
        >
            {props.children}

            {props.resizable && (
                <>
                    {(['se', 'ne', 'sw', 'nw'] as const).map(direction => (
                        <ResizeHandle
                            key={direction}
                            direction={direction}
                            style={{
                                position: 'absolute',
                                ...(direction.includes('e') ? { right: 0 } : { left: 0 }),
                                ...(direction.includes('s') ? { bottom: 0 } : { top: 0 }),
                            }}
                            width={RESIZE_HANDLE_SIZE / props.zoom}
                            height={RESIZE_HANDLE_SIZE / props.zoom}
                            onMouseDown={(e) => handleMouseDownResize(e, direction)}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
