import { Vector2 } from "@/scripts/utils"
import { CSSProperties, MouseEventHandler, useCallback, useState } from "react";
import { useGraphViewContext } from "./GraphView";

type GraphNodeProps = {
    id: string,
    position: Vector2,
    size: Vector2,
    data: JSON | string,
    children?: JSX.Element | JSX.Element[]
    onSave?: (data: JSON) => void
}

export default function (props: GraphNodeProps) {
    const { scale } = useGraphViewContext()
    const [position, setPosition] = useState<Vector2>(props.position);
    const [size, _setSize] = useState<Vector2>(props.size);

    const updatePosition = useCallback((delta: { x: number, y: number }) => {
        setPosition(prev => ({
            x: prev.x + delta.x / scale,
            y: prev.y + delta.y / scale
        }));
    }, [scale])

    // Handle mouse down for panning
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.button !== 0) return; // Only for middle mouse button

        let startX = event.clientX;
        let startY = event.clientY;
        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            updatePosition({ x: deltaX, y: deltaY });

            // Update start position for continuous dragging
            startX = moveEvent.clientX;
            startY = moveEvent.clientY;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [updatePosition]);

    const nodeStyle: CSSProperties = {
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.x}px`,
        height: `${size.y}px`,
    };

    return <div
        className="graph-node shadow-black shadow-2xl"
        style={nodeStyle}
        onMouseDown={handleMouseDown}>

        <div 
        className="graph-node-content">
            {props.children}
        </div>
    </div>
} 