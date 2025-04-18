import { useCallback, useRef } from 'react';

export interface ZoomInfo {
    scaleFactor: number;
    mouseX: number;
    mouseY: number;
}

interface ZoomHookProps {
    onZoom: (info: ZoomInfo) => void;
    minZoom?: number;
    maxZoom?: number;
    zoomSpeed?: number;
}

export function useZoom({
    onZoom,
    minZoom = 0.1,
    maxZoom = 10,
    zoomSpeed = 0.1,
}: ZoomHookProps) {
    const zoomRef = useRef({ zoom: 1 });

    const onWheel = useCallback(
        (e: React.WheelEvent) => {
            e.preventDefault();

            const { clientX, clientY, deltaY } = e;
            const factor = 1 - zoomSpeed * Math.sign(deltaY);
            const newZoom = Math.min(Math.max(zoomRef.current.zoom * factor, minZoom), maxZoom);
            const scaleFactor = newZoom / zoomRef.current.zoom;

            if (scaleFactor === 1) return;

            zoomRef.current.zoom = newZoom;

            onZoom({
                scaleFactor,
                mouseX: clientX,
                mouseY: clientY,
            });
        },
        [onZoom, minZoom, maxZoom, zoomSpeed]
    );

    return { onWheel };
}
