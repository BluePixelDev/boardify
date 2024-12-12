import { useDragContext } from "@/hooks/DragProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import ResizeHandle from "./ResizeHandle";

type TransformRectProps = {
    zoom: number
    initialX: number,
    initialY: number,
    initialWidth: number,
    initialHeight: number,
    draggable?: boolean,
    resizable?: boolean,
    onMove?: (newPosition: { x: number, y: number }) => void,
    onResize?: (newSize: { width: number, height: number }) => void,
    setPosition?: (position: { width: number, height: number }) => void,
    setSize?: (position: { width: number, height: number }) => void,
    children: JSX.Element | JSX.Element[]
}

const RESIZE_HANDLE_SIZE = 8; // size of the resize handle
export default function (props: TransformRectProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: props.initialX,
        y: props.initialY,
    });
    const [size, setSize] = useState<{ width: number; height: number }>({
        width: props.initialWidth,
        height: props.initialHeight,
    });

    const dragContext = useDragContext();
    const transformRef = useRef<HTMLDivElement>(null);
    const resizingRef = useRef<{
        isResizing: boolean;
        direction: string;
    }>({ isResizing: false, direction: '' });
    const startSizeRef = useRef({ width: size.width, height: size.height });
    const startMousePositionRef = useRef({ x: 0, y: 0 });
    const startPositionRef = useRef({ x: 0, y: 0 });

    // Dragging Logic
    useEffect(() => {
        if (dragContext.startTarget != transformRef.current) return;
        if (dragContext.originalEvent?.button != 0) return;

        updatePosition({
            x: dragContext.mouse.deltaX,
            y: dragContext.mouse.deltaY
        });
    }, [dragContext]);

    const updatePosition = useCallback((delta: { x: number, y: number }) => {
        setPosition(state => ({
            x: state.x + delta.x / props.zoom,
            y: state.y + delta.y / props.zoom
        }));
        props.onMove?.({ x: position.x, y: position.y });
    }, [props.zoom]);

    // Resizing Logic
    const handleMouseDownResize = (e: React.MouseEvent, direction: string) => {
        resizingRef.current.isResizing = true;
        resizingRef.current.direction = direction;
        startMousePositionRef.current = { x: e.clientX, y: e.clientY };
        startPositionRef.current = { x: position.x, y: position.y }
        startSizeRef.current = { width: size.width, height: size.height };
        e.preventDefault();
    };

    const handleMouseMoveResize = useCallback((e: MouseEvent) => {
        if (!resizingRef.current.isResizing) return;

        const { x, y } = startMousePositionRef.current;
        const deltaX = e.clientX - x;
        const deltaY = e.clientY - y;

        // Calculating new position and size based on the direction of resizing
        let newPosition = { ...position };  // Start with the current position
        let newSize = { ...size };          // Start with the current size

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
                newPosition.y = startPositionRef.current.y + deltaY / props.zoom; // Move downwards
                break;
            case 'sw':
                newSize = {
                    width: startSizeRef.current.width - deltaX / props.zoom,
                    height: startSizeRef.current.height + deltaY / props.zoom
                };
                newPosition.x = startPositionRef.current.x + deltaX / props.zoom; // Move rightwards
                break;
            case 'nw':
                newSize = {
                    width: startSizeRef.current.width - deltaX / props.zoom,
                    height: startSizeRef.current.height - deltaY / props.zoom
                };
                newPosition.x = startPositionRef.current.x + deltaX / props.zoom; // Move rightwards
                newPosition.y = startPositionRef.current.y + deltaY / props.zoom; // Move downwards
                break;
            default:
                break;
        }

        // Apply the new size and position
        setSize(newSize);
        setPosition(newPosition);
        props.onResize?.({ width: size.width, height: size.height });
    }, [props.zoom, size, position]);

    const handleMouseUpResize = () => {
        resizingRef.current.isResizing = false;
        resizingRef.current.direction = '';
    };

    // Add event listeners for mousemove and mouseup
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMoveResize);
        window.addEventListener('mouseup', handleMouseUpResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveResize);
            window.removeEventListener('mouseup', handleMouseUpResize);
        };
    }, [handleMouseMoveResize]);

    // Apply position and size changes to the element
    useEffect(() => {
        if (!transformRef.current) return;
        transformRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    }, [position]);

    useEffect(() => {
        if (!transformRef.current) return;
        transformRef.current.style.width = `${size.width}px`;
        transformRef.current.style.height = `${size.height}px`;
    }, [size]);

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

            {/* Resize Handles */}
            {props.resizable && (<>
                <ResizeHandle
                    direction={"se"}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                    }}
                    width={RESIZE_HANDLE_SIZE / props.zoom}
                    height={RESIZE_HANDLE_SIZE / props.zoom}
                    onMouseDown={handleMouseDownResize} />

                <ResizeHandle
                    direction={"ne"}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                    width={RESIZE_HANDLE_SIZE / props.zoom}
                    height={RESIZE_HANDLE_SIZE / props.zoom}
                    onMouseDown={handleMouseDownResize} />
                <ResizeHandle
                    direction={"sw"}
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                    }}
                    width={RESIZE_HANDLE_SIZE / props.zoom}
                    height={RESIZE_HANDLE_SIZE / props.zoom}
                    onMouseDown={handleMouseDownResize} />
                <ResizeHandle
                    direction={"nw"}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}
                    width={RESIZE_HANDLE_SIZE / props.zoom}
                    height={RESIZE_HANDLE_SIZE / props.zoom}
                    onMouseDown={handleMouseDownResize} />
            </>)}
        </div>
    );
}
