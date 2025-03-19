import { createContext, useContext, useMemo, useState } from "react";
import { getPosition, getScale, pan, Point } from "../matrixUtils";


interface Transform {
    matrix: number[];
}
const identityMatrix = [1, 0, 0, 1, 0, 0];

interface GraphViewContextType {
    transform: Transform
    setTransform: (transform: React.SetStateAction<Transform>) => void
    pan: (delta: Point) => void
    zoom: number,
    position: Point,
    setPosition: (position: Point) => void
    setZoom: (zoom: number) => void
}

const GraphViewContext = createContext<GraphViewContextType>({
    transform: {
        matrix: [0]
    },
    setTransform: () => { },
    pan: () => { },
    zoom: 1,
    position: { x: 0, y: 0 },
    setPosition: () => { },
    setZoom: () => { },
});

export const useGraphViewContext = () => {
    const context = useContext(GraphViewContext);
    if (!context) throw new Error("useGraphViewContext must be used within a GraphViewProvider");
    return context;
};

export const GraphViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [transform, setTransform] = useState<Transform>({ matrix: identityMatrix })
    const position = useMemo<Point>(() => getPosition(transform.matrix), [transform])
    const zoom = useMemo<number>(() => getScale(transform.matrix), [transform])

    const handlePan = (delta: Point) => {
        setTransform((prev) => ({ matrix: pan(prev.matrix, delta) }));
    };

    const handleSetPosition = (position: Point) => {
        setTransform((prev) => ({ matrix: [prev.matrix[0], prev.matrix[1], prev.matrix[2], prev.matrix[3], position.x, position.y] }));
    };

    const handleSetZoom = (zoom: number) => {
        setTransform((prev) => ({ matrix: [zoom, prev.matrix[1], prev.matrix[2], zoom, prev.matrix[4], prev.matrix[5]] }));
    };

    const contextValue = useMemo(
        () => ({
            transform,
            setTransform,
            pan: handlePan,
            position,
            zoom,
            setZoom: handleSetZoom,
            setPosition: handleSetPosition
        }),
        [transform]
    );

    return <GraphViewContext.Provider value={contextValue}>{children}</GraphViewContext.Provider>;
} 