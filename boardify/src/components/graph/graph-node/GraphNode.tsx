import "./graphnode.css"
import { useRef } from "react";
import { useGraphViewContext } from "../graph-view/GraphView";
import TransformRect from "../transform-rect/TransformRect";

type GraphNodeProps = {
    position: { x: number, y: number },
    size: { width: number, height: number },
    children?: JSX.Element | JSX.Element[],
}

export default function (props: GraphNodeProps) {
    const { scale } = useGraphViewContext()
    const nodeRef = useRef<HTMLDivElement>(null)

    return <div>
        <TransformRect
            zoom={scale}
            x={props.position.x}
            y={props.position.y}
            width={props.size.width}
            height={props.size.height}
            draggable={true}
        >
            <div
                ref={nodeRef}
                className="graph-node shadow-black shadow-2xl w-full h-full">
                <div className="graph-node-content">{props.children}</div>
            </div >
        </TransformRect>
    </div>

} 