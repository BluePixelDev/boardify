import BoardGrid from "./BoardGrid"
import { CSSProperties, MouseEventHandler, useCallback, useEffect, useRef, useState, WheelEventHandler } from 'react';

type Props = {
    children?: JSX.Element | JSX.Element[]
}

type BoardData = {
    xPos: number,
    yPos: number,
    scale: number
}

export default function BoardView(props: Props) {

    const [data, setData] = useState<BoardData>({
        xPos: 0,
        yPos: 0,
        scale: 1
    });

    const [isDragging, setIsDragging] = useState(false);
    const startPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const documentRef = useRef(document);

    const boardStyle: CSSProperties = {
        cursor: `${isDragging ? "grabbing" : "default"}`
    }

    const contentViewStyle: CSSProperties = {
        transform: `scale(${data.scale}) translate(${data.xPos}px, ${data.yPos}px)`
    };

    //#region DRAGGING
    const handleMouseMove = useCallback((event: MouseEvent) => {
        const deltaX = event.clientX - startPositionRef.current.x;
        const deltaY = event.clientY - startPositionRef.current.y;

        setData(prevData => ({
            ...prevData,
            xPos: prevData.xPos + deltaX / data.scale,
            yPos: prevData.yPos + deltaY / data.scale,
        }));
        startPositionRef.current = {
            x: event.clientX,
            y: event.clientY
        };
    }, [data.scale]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        // Immediately set dragging state
        setIsDragging(true);

        // Capture initial position
        const x = event.clientX;
        const y = event.clientY;
        startPositionRef.current = { x, y };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);
    //#endregion

    //#region ZOOMIN
    const handleZoom: WheelEventHandler<HTMLDivElement> = useCallback((event) => {
        const scrollDir = Math.sign(event.deltaY) * 0.1
        const container = event.currentTarget; // The board container
        const mouseX = event.clientX - container.getBoundingClientRect().left; // Mouse X position relative to the container
        const mouseY = event.clientY - container.getBoundingClientRect().top; // Mouse Y position relative to the container

        const newZoom = data.scale - scrollDir; // Calculate new zoom level
        const zoomFactor = newZoom / data.scale; // Factor by which the zoom changes

        // Adjust the position to ensure zoom is centered around the mouse
        const newX = data.xPos - (mouseX - data.xPos) * (zoomFactor - 1);
        const newY = data.yPos - (mouseY - data.yPos) * (zoomFactor - 1);

        // Set the new zoom and position
        setData(_prevData => ({
            scale: Math.max(0.1, Math.min(10, newZoom)), // Clamp zoom between 0.1 and 10
            xPos: newX,
            yPos: newY
        }));
    }, [data.scale, data.xPos, data.yPos])
    //#endregion

    useEffect(() => {
        return () => {
            documentRef.current.removeEventListener("mousemove", handleMouseMove);
            documentRef.current.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className="board-view-default" onMouseDown={onMouseDown} onWheel={handleZoom} style={boardStyle}>
            <BoardGrid offsetX={data.xPos * data.scale} offsetY={data.yPos * data.scale} scale={data.scale}/>
            <div className={`board-content-view-default`} style={contentViewStyle}>
                {props.children}
            </div>
        </div>
    )
}