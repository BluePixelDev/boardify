import { GraphNodeData } from "../graphview/types"

export interface IRenderer {
    render: (node: GraphNodeData<any>) => JSX.Element | null
}

export interface IRendererRegistry {
    registerRenderer: (nodeType: string, renderer: IRenderer) => void
    getRenderer: (nodeType: string) => IRenderer | null
    removeRenderer: (nodeType: string) => void
}