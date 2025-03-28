export interface GraphNodePosition {
    x: number
    y: number
}

export interface GraphNodeSize {
    width: number
    height: number
}

/**
 * Represents a node in the GraphView.
 */
export interface GraphNodeData<T = any> {
    id: string;
    type: string;
    position: GraphNodePosition;
    size: GraphNodeSize;
    aspect?: number
    data: T;
}

export interface GraphNodeProps<T = any> {
    node: GraphNodeData<T>
}