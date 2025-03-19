export interface GraphNodePosition  {
    x: number
    y: number
}

export interface GraphNodeSize {
    width: number
    height: number
}

/**
 * Represents a node in the GraphView.
 * This interface is used by your GraphNode component and related logic.
 */
export interface GraphNodeData<T = any> {
    id: string;
    type: string;
    position: GraphNodePosition ;
    size: GraphNodeSize;
    aspect?: number
    data: T;
}