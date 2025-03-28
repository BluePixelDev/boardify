import { GraphNodeData } from "../graphview/types/graphTypes";
import { IRenderer, IRendererRegistry } from "./IRenderer";

export type NodeRenderer<T = any> = (props: { node: GraphNodeData<T> }) => JSX.Element | JSX.Element[];
class RendererRegistry implements IRendererRegistry {
    private renderers: Record<string, IRenderer> = {};

    public registerRenderer(type: string, renderer: IRenderer) {
        this.renderers[type] = renderer;
    }

    public getRenderer(type: string) {
        return this.renderers[type];
    }

    public removeRenderer(type: string) {
        delete this.renderers[type]
    }
}

export const rendererRegistry = new RendererRegistry();