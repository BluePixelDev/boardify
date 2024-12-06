import useDrag from "@/hooks/UseDrag";
import GridBackground from "./GridBackground";
import { createContext, CSSProperties, useCallback, useContext, useEffect, useRef, useState, WheelEventHandler } from 'react';

type GraphProperties = {
    minZoom: number,
    maxZoom: number,
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
    const [targetTranslate, setTargetTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const contentViewRef = useRef<HTMLDivElement>(null);

    // ==== UPDATING ====
    const updatePosition = useCallback((delta: { x: number; y: number }) => {
        setTargetTranslate(prev => ({
            x: prev.x + delta.x,
            y: prev.y + delta.y
        }));
    }, [scale]);

    const updatePositionNoSmooth = useCallback((newPosition: { x: number; y: number }) => {
        setTranslate(newPosition);
        setTargetTranslate(newPosition);
    }, []);

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

            updatePositionNoSmooth({ x: newX, y: newY });
        }

        setScale(newScale);
    }, [scale, translate]);

     // Smooth interpolation parameters
     const smoothingFactor = 0.5;
     const epsilon = 0.2;  

    useEffect(() => {
        let animationFrameId: number;

        const interpolateTranslate = () => {
            const dx = targetTranslate.x - translate.x;
            const dy = targetTranslate.y - translate.y;

            if (Math.abs(dx) > epsilon || Math.abs(dy) > epsilon) {
                const newX = translate.x + dx * smoothingFactor;
                const newY = translate.y + dy * smoothingFactor;

                setTranslate({
                    x: Math.abs(dx) > epsilon ? newX : targetTranslate.x,
                    y: Math.abs(dy) > epsilon ? newY : targetTranslate.y
                });

                animationFrameId = requestAnimationFrame(interpolateTranslate);
            }
        };

        animationFrameId = requestAnimationFrame(interpolateTranslate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [targetTranslate, translate]);

    // Checks whether this element can be dragged
    const checkDrag = (event: MouseEvent) => event.button == 1

    useDrag({
        shouldDrag: checkDrag,
        onDrag: updatePosition
    })

    // ==== CALLBACKS ====
    const handleZoom: WheelEventHandler<HTMLDivElement> = useCallback((event) => {
        const delta = Math.sign(event.deltaY) * -0.1;
        updateScale(delta, { x: event.clientX, y: event.clientY });
    }, [updateScale]);

    useEffect(() => {
        if (!contentViewRef.current) return;
        contentViewRef.current.style.transform = `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`
    }, [scale, translate])

    const boardStyle: CSSProperties = {
        cursor: 'grab',
        overflow: 'hidden',
    };

    const graphViewContentStyle: CSSProperties = {
        transformOrigin: '0 0'
    }

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
                onWheel={handleZoom}
                style={boardStyle}>

                <GridBackground />
                <div
                    ref={contentViewRef}
                    className={`board-content-view-default`}
                    style={graphViewContentStyle}
                >
                    {props.children}
                </div>

            </div>
        </GraphViewContext.Provider>
    )
}