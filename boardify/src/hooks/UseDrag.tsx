import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    /** Condition to check if drag should be allowed */
    shouldDrag?: (event: MouseEvent) => boolean,
    /** Callback with delta movement during drag */
    onDrag: (delta: { x: number, y: number }) => void,
}

/**
 * A hook for checking whether an element is being dragged.
 */
const useDrag = (props: Props) => {

    // Component Setup
    useEffect(() => {
        addEventListener('mousedown', handleMouseDown)
        addEventListener('mousemove', handleMouseMove)
        addEventListener('mouseup', handleMouseUp)

        // Component Cleanup
        return () => {
            removeEventListener('mousedown', handleMouseDown)
            removeEventListener('mousemove', handleMouseMove);
            removeEventListener('mouseup', handleMouseUp);
        }
    })

    // Dragging
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const mouseStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    // Handle mouse down for panning
    const handleMouseDown = useCallback((mouseEvent: MouseEvent) => {
        if (props.shouldDrag && !props.shouldDrag(mouseEvent)) return
        
        setIsDragging(true)

        mouseStartPosRef.current = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
        }

    }, [props.onDrag]);

    const handleMouseMove = useCallback((mouseEvent: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = mouseEvent.clientX - mouseStartPosRef.current.x;
        const deltaY = mouseEvent.clientY - mouseStartPosRef.current.y;
        props.onDrag({ x: deltaX, y: deltaY });

        // Update start position for continuous dragging
        mouseStartPosRef.current = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
        };
    }, [isDragging]);

    const handleMouseUp = () => {
        setIsDragging(false)
    };
}

export default useDrag;