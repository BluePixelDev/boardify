import { createContext, useContext, useMemo, useState } from "react";

interface Position {
    x: number
    y: number
}

interface Transform {
    zoom: number
    position: Position
}

interface GraphViewContextType {
    transform: Transform
    setTransform: (transform: React.SetStateAction<Transform>) => void
}

const GraphViewContext = createContext<GraphViewContextType>({
    transform: {
        zoom: 1,
        position: { x: 0, y: 0 }
    },
    setTransform: () => { }
});

export const useGraphViewContext = () => useContext(GraphViewContext);

export const GraphViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState<Position>({ x: 0, y: 0 });

    const panGraph = (delta: Position) => {
        setPosition((prevPosition) => ({
            x: prevPosition.x + delta.x,
            y: prevPosition.y + delta.y,
        }));
    }

    const zoomGraph = (delta: number) => {
        setZoom(zoom + delta)
    }

    const contextValue = useMemo(
        () => ({
            zoom,
            position,
            targetPosition,
            setZoom,
            setPosition,
            setTargetPosition,
            panGraph,
            zoomGraph,
        }),
        [zoom, position, targetPosition]
    );

    return <GraphViewContext.Provider value={contextValue}>{children}</GraphViewContext.Provider>;
} 