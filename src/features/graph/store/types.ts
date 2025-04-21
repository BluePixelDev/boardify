export interface Layer {
    id: string
    name: string

    /** Hex or CSS color representing the layer visually */
    color: string
    icon: string
}

export interface GraphNodeProps<T = unknown> {
    /** The full node data object, including type, layer, and custom data */
    node: GraphNodeData<T>
}

export interface GraphNodePosition {
    /** X coordinate on the canvas */
    x: number

    /** Y coordinate on the canvas */
    y: number
}

export interface GraphNodeSize {
    /** Node width in pixels or units */
    width: number

    /** Node height in pixels or units */
    height: number
}

export interface GraphNodeData<T = unknown> {
    id: string

    /** Node type identifier, used to distinguish behavior/rendering */
    type: string

    /** ID of the layer this node belongs to */
    layerId: string

    position: GraphNodePosition
    size: GraphNodeSize

    /** Custom user-defined data attached to this node */
    data: T
}
