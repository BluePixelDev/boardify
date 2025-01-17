export interface NodePosition {
    x: number;
    y: number;
}

export interface NodeSize {
    width: number;
    height: number;
}

export interface BoardNodeData<T = any> {
    [key: string]: T;
}

export interface BoardNode<T = any> {
    id: string;
    type: string;
    position: NodePosition;
    size: NodeSize;
    data: BoardNodeData<T>;
}