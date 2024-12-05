import GridBackground from "./GridBackground";
import { createContext, CSSProperties, MouseEventHandler, useCallback, useContext, useRef, useState, WheelEventHandler } from 'react';

type GraphProperties = {
    minZoom: number,
    maxZoom: number
}

type Props = {
    children?: JSX.Element | JSX.Element[],
    graph?: GraphProperties
}

interface GraphViewContextType {
    scale: number;
    translate: { x: number; y: number };
    updatePosition: (delta: { x: number; y: number }) => void;
    updateScale: (delta: number, mousePosition?: { x: number; y: number }) => void;
}

const GraphViewContext = createContext<GraphViewContextType>({
    scale: 1,
    translate: { x: 0, y: 0 },
    updatePosition: () => { },
    updateScale: () => { }
});

export const useGraphViewContext = () => useContext(GraphViewContext);

export default function GraphView(props: Props) {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback((delta: { x: number; y: number }) => {
        setTranslate(prev => ({
            x: prev.x + delta.x / scale,
            y: prev.y + delta.y / scale
        }));
    }, [scale]);

    const updateScale = useCallback((delta: number, mousePosition?: { x: number; y: number }) => {
        if (!containerRef.current) return;

        const newScale = Math.max(props.graph?.minZoom ?? 0.1, Math.min(props.graph?.maxZoom ?? 10, scale + delta));
        const zoomFactor = newScale / scale;

        if (mousePosition) {
            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = mousePosition.x - rect.left;
            const mouseY = mousePosition.y - rect.top;

            const newX = translate.x - (mouseX - translate.x) * (zoomFactor - 1);
            const newY = translate.y - (mouseY - translate.y) * (zoomFactor - 1);

            setTranslate({ x: newX, y: newY });
        }

        setScale(newScale);
    }, [scale, translate]);

    const handleZoom: WheelEventHandler<HTMLDivElement> = useCallback((event) => {
        const delta = Math.sign(event.deltaY) * -0.1;
        updateScale(delta, { x: event.clientX, y: event.clientY });
    }, [updateScale]);

    // Handle mouse down for panning
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        if (event.button !== 1) return; // Only for middle mouse button

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

    const boardStyle: CSSProperties = {
        cursor: 'grab',
        overflow: 'hidden',
    };

    const contentStyle: CSSProperties = {
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
        transformOrigin: '0 0'
    };

    return (
        <GraphViewContext.Provider value={{
            scale,
            translate,
            updatePosition,
            updateScale

        }}>
            <div
                ref={containerRef}
                className="board-view-default"
                onMouseDown={handleMouseDown}
                onWheel={handleZoom}
                style={boardStyle}>

                <GridBackground/>
                <div className={`board-content-view-default`} style={contentStyle}>
                    {props.children}
                </div>

            </div>
        </GraphViewContext.Provider>
    )
}