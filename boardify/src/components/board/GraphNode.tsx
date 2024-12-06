import useDrag from "@/hooks/UseDrag";
import { Vector2 } from "@/scripts/utils";
import { CSSProperties, useCallback, useRef, useState } from "react";
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
    const nodeRef = useRef<HTMLDivElement>(null)

    const updatePosition = useCallback((delta: { x: number, y: number }) => {
        setPosition(prev => ({
            x: prev.x + delta.x / scale,
            y: prev.y + delta.y / scale
        }));
    }, [scale])

    const checkDrag = (event: MouseEvent) => {
        return event.button == 0 && event.target == nodeRef.current
    }

    useDrag({
        shouldDrag: checkDrag,
        onDrag: updatePosition
    })

    const nodeStyle: CSSProperties = {
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.x}px`,
        height: `${size.y}px`,
    };

    return <div
        ref={nodeRef}
        className="graph-node shadow-black shadow-2xl"
        style={nodeStyle}>

        <div
            className="graph-node-content">
            {props.children}
        </div>
    </div>
} 