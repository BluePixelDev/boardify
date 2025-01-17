import "./basenode.css"
import { useRef } from "react";
import { useGraphViewContext } from "../../board/board-view/BoardView";
import TransformRect from "../../../shared/transform-rect/TransformRect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { NodeSize } from "../types/node-types";
import { updateNode } from "../redux/nodesSlice";

type BoardNodeProps = {
    nodeId: string,
    children?: JSX.Element | JSX.Element[],
    onResize?: (newSize: { width: number, height: number }) => void,
    onMove?: (newPos: { x: number, y: number }) => void,
    constraints?: {
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        minX?: number;
        maxX?: number;
        minY?: number;
        maxY?: number;
    };
    aspectRatio?: number;
}

export default function (props: BoardNodeProps) {
    const { scale } = useGraphViewContext()
    const nodeRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch();

    const node = useSelector((state: RootState) =>
        state.graphNodes.nodes.find((n: any) => n.id === props.nodeId)
    );

    const handleMove = (newPos: { x: number; y: number }) => {
        dispatch(updateNode({ id: props.nodeId, position: newPos }));
    };

    const handleResize = (newSize: NodeSize) => {
        dispatch(updateNode({
            id: props.nodeId,
            size: newSize,
            position: node?.position
        }));
    };

    return <>
        <TransformRect
            zoom={scale}
            initialX={node?.position.x ?? 0}
            initialY={node?.position.y ?? 0}
            initialWidth={node?.size.width ?? 100}
            initialHeight={node?.size.height ?? 100}
            draggable={true}
            resizable={true}
            aspectRatio={props.aspectRatio}
            onResize={handleResize}
            onMove={handleMove}
        >
            <div
                ref={nodeRef}
                className="board-node shadow-black shadow-2xl w-full h-full">
                <div className="board-node-content">{props.children}</div>
            </div >
        </TransformRect>
    </>

} 