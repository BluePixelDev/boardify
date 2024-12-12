import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface DragInfo {
    isDragging: boolean;
    mouse: MouseInfo
    startTarget: HTMLElement | null;
    originalEvent: MouseEvent | null;
}

interface MouseInfo {
    deltaX: number;
    deltaY: number;
    currentX: number;
    currentY: number;
    startX: number;
    startY: number;
}

const DragContext = createContext<DragInfo | undefined>(undefined);

export default function DragProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    const dragInfoRef = useRef<DragInfo>({
        isDragging: false,
        mouse: {
            deltaX: 0,
            deltaY: 0,
            currentX: 0,
            currentY: 0,
            startX: 0,
            startY: 0
        },
        startTarget: null,
        originalEvent: null
    });

    const [dragInfo, setDragInfo] = useState<DragInfo>(dragInfoRef.current);

    // Component Setup
    useEffect(() => {
        addEventListener('mousedown', startDrag)
        addEventListener('mousemove', updateDrag)
        addEventListener('mouseup', endDrag)

        // Component Cleanup
        return () => {
            removeEventListener('mousedown', startDrag)
            removeEventListener('mousemove', updateDrag);
            removeEventListener('mouseup', endDrag);
        }
    }, [])


    //==== MAIN LOGIC ====
    const startDrag = useCallback((event: MouseEvent) => {
        const newDragInfo: DragInfo = {
            isDragging: true,
            mouse: {
                deltaX: 0,
                deltaY: 0,
                currentX: event.clientX,
                currentY: event.clientY,
                startX: event.clientX,
                startY: event.clientY
            },
            startTarget: event.target as HTMLElement,
            originalEvent: event
        };
        dragInfoRef.current = newDragInfo
        setDragInfo(newDragInfo);
    }, []);

    const updateDrag = useCallback((event: MouseEvent) => {
        if (!dragInfoRef.current.isDragging) return;

        const updatedDragInfo: DragInfo = {
            ...dragInfoRef.current,
            mouse: {
                ...dragInfoRef.current.mouse,
                deltaX: event.clientX - dragInfoRef.current.mouse.currentX,
                deltaY: event.clientY - dragInfoRef.current.mouse.currentY,
                currentX: event.clientX,
                currentY: event.clientY,
            }
        };

        dragInfoRef.current = updatedDragInfo;
        setDragInfo(updatedDragInfo);
    }, [dragInfoRef]);

    const endDrag = useCallback(() => {
        const finalDragInfo: DragInfo = {
            ...dragInfoRef.current,
            isDragging: false,
            mouse: {
                deltaX: 0,
                deltaY: 0,
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0
            },
            originalEvent: null
        };
        dragInfoRef.current = finalDragInfo;
        setDragInfo(finalDragInfo);
    }, []);

    return (
        <DragContext.Provider value={dragInfo}>
            {children}
        </DragContext.Provider>
    )
}

export const useDragContext = () => {
    const context = useContext(DragContext);
    if (context === undefined) {
        throw new Error('useDragContext must be used within a DragProvider');
    }
    return context;
};