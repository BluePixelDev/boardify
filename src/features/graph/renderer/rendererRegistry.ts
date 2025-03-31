import { GraphNodeData } from "../graphview/types/graphTypes";

export type NodeRenderer<T = any> = (props: { node: GraphNodeData<T> }) => JSX.Element | JSX.Element[];

class RendererRegistry {
    private renderers: Record<string, NodeRenderer> = {};

    public register<T>(type: string, renderer: NodeRenderer<T>) {
        this.renderers[type] = renderer;
    }

    public getRenderer(type: string) {
        return this.renderers[type];
    }
}

export const rendererRegistry = new RendererRegistry();