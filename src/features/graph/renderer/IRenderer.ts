export interface IRendererProps {
    nodeType: string
    nodeId: string
    data: any
}

export interface IRenderer {
    render: (props: IRendererProps) => JSX.Element | null
}

export interface IRendererRegistry {
    registerRenderer: (nodeType: string, renderer: IRenderer) => void
    getRenderer: (nodeType: string) => IRenderer | null
    removeRenderer: (nodeType: string) => void
}