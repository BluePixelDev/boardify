export interface NodePosition {
    x: number;
    y: number;
}

export interface NodeSize {
    width: number;
    height: number;
}

export interface GraphNodeData<T = any> {
    [key: string]: T;
}

export interface GraphNode<T = any> {
    id: string;
    type: string;
    position: NodePosition;
    size: NodeSize;
    data: GraphNodeData<T>;
}