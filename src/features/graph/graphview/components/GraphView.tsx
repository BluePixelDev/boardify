import "../graph.styles.css"
import React, { CSSProperties, useCallback, useRef, WheelEventHandler, MouseEventHandler } from 'react'
import { useDrag } from '../hooks'
import { useGraphViewContext } from "../context/GraphViewProvider"
import { DragDelta } from "../hooks/useDrag"

//==== GRAPHVIEW ====
export type GraphViewProps = {
  minZoom?: number
  maxZoom?: number
  grid?: React.ReactNode
  children?: React.ReactNode
  overlay?: React.ReactNode
}

export default function GraphView({
  grid,
  children,
  overlay,
  minZoom = 0.1,
  maxZoom = 10,
}: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { position, zoom, setZoom, setPosition, transform } = useGraphViewContext()

  const handleWheel: WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const mousePosition = { x: e.clientX - containerRect.left, y: e.clientY - containerRect.top }

    const factor = 1 - 0.1 * Math.sign(e.deltaY)
    let newZoom = Math.min(Math.max(zoom * factor, minZoom), maxZoom);
    if (newZoom === zoom) return;

    const worldX = (mousePosition.x - position.x) / zoom
    const worldY = (mousePosition.y - position.y) / zoom

    const newPosition = {
      x: mousePosition.x - worldX * newZoom,
      y: mousePosition.y - worldY * newZoom
    }
    
    setZoom(newZoom)
    setPosition(newPosition)
  }, [minZoom, maxZoom, setPosition, setZoom])


  const onDragMove = (delta: DragDelta) => {
    setPosition({
      x: position.x + delta.deltaX,
      y: position.y + delta.deltaY
    })
  }

  const { onMouseDown } = useDrag({ onDrag: onDragMove })

  const handleDrag: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (event.button !== 1) return
    onMouseDown(event)
  }, [onMouseDown])

  const contentStyle: CSSProperties = {
    transform: `matrix(${transform.matrix.join(', ')})`,
  }

  return (
    <div
      ref={containerRef}
      className="graph-view"
      onWheel={handleWheel}
      onMouseDown={handleDrag}
    >
      <div className="graph-view__grid">
        {grid}
      </div>

      <div className="graph-view__content" style={contentStyle}>
        {children}
      </div>

      <div className="graph-view__overlay">
        {overlay}
      </div>
    </div>
  )
}
