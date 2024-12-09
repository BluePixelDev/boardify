import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useGraphViewContext } from "./GraphView";
import { useDragContext } from "@/hooks/DragProvider";

type ViewNodeProps = {
    id: string,
    position: { x: number, y: number },
    size: { width: number, height: number },
    children?: JSX.Element | JSX.Element[],
    onSelect?: (id: string) => void;
}

export default function (props: ViewNodeProps) {
    const { scale } = useGraphViewContext()
    const [position, setPosition] = useState<{ x: number, y: number }>(props.position);
    const [size, setSize] = useState<{ width: number, height: number }>(props.size);
    const [isSelected, setIsSelected] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null)

    const dragProvider = useDragContext();

    useEffect(() => {
        if (dragProvider.startTarget != nodeRef.current) return
        if (dragProvider.originalEvent?.button != 0) return
        updatePosition({x: dragProvider.deltaX, y: dragProvider.deltaY})
    }, [dragProvider])

    const updatePosition = useCallback((delta: { x: number, y: number }) => {
        setPosition(prev => ({
            x: prev.x + delta.x / scale,
            y: prev.y + delta.y / scale
        }));
    }, [scale])

    useEffect(() => {
        if (!nodeRef.current) return;
        nodeRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
    }, [position])

     // Resize the node (based on edge position)
     const updateSize = useCallback(
        (delta: { x: number; y: number }, corner: string) => {
            setSize((prev) => {
                switch (corner) {
                    case "top-left":
                        return {
                            width: prev.width - delta.x,
                            height: prev.height - delta.y,
                        };
                    case "top-right":
                        return {
                            width: prev.width + delta.x,
                            height: prev.height - delta.y,
                        };
                    case "bottom-left":
                        return {
                            width: prev.width - delta.x,
                            height: prev.height + delta.y,
                        };
                    case "bottom-right":
                        return {
                            width: prev.width + delta.x,
                            height: prev.height + delta.y,
                        };
                    default:
                        return prev;
                }
            });
        },
        []
    );

    const handleSelect = () => {
        if (props.onSelect) {
            props.onSelect(props.id);
        }
        setIsSelected((prev) => !prev); // Toggle selection
    };

    const nodeStyle: CSSProperties = {
        position: "absolute",
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: isSelected ? "2px solid blue" : "1px solid black",
    };

    const resizeHandleStyle: CSSProperties = {
        position: "absolute",
        width: "10px",
        height: "10px",
        backgroundColor: "gray",
        cursor: "pointer",
    };

    return <div
        ref={nodeRef}
        className="graph-node shadow-black shadow-2xl"
        style={nodeStyle}
        onClick={handleSelect}>

        <div
            className="graph-node-content">
            {props.children}
        </div>
    </div>
} 