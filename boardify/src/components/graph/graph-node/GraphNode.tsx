import "./graphnode.css"
import { useRef } from "react";
import { useGraphViewContext } from "../graph-view/GraphView";
import TransformRect from "../transform-rect/TransformRect";

type GraphNodeProps = {
    initialPosition: { x: number, y: number },
    initalSize: { width: number, height: number },
    children?: JSX.Element | JSX.Element[],
    onResize?: (newSize: { width: number, height: number }) => void,
    onMove?: (newPos: { x: number, y: number }) => void,
}

export default function (props: GraphNodeProps) {
    const { scale } = useGraphViewContext()
    const nodeRef = useRef<HTMLDivElement>(null)

    return <>
        <TransformRect
            zoom={scale}
            initialX={props.initialPosition.x}
            initialY={props.initialPosition.y}
            initialWidth={props.initalSize.width}
            initialHeight={props.initalSize.height}
            draggable={true}
            onResize={props.onResize}
            onMove={props.onMove}
        >
            <div
                ref={nodeRef}
                className="graph-node shadow-black shadow-2xl w-full h-full">
                <div className="graph-node-content">{props.children}</div>
            </div >
        </TransformRect>
    </>

} 