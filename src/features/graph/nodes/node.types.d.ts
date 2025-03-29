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
export interface GraphNodeData<T> {
    id: string;
    type: string;
    position: GraphNodePosition;
    size: GraphNodeSize;
    data: T;
}

export interface GraphNodeProps<T = any> {
    node: GraphNodeData<T>
}