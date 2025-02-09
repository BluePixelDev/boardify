import { GraphViewNode } from "../../graphview/types/graphTypes";

type NodeRendererComponent<T = any> = (props: { node: GraphViewNode<T> }) => JSX.Element | JSX.Element[];

class NodeRendererManager {
    private static instance: NodeRendererManager;
    private renderers: Record<string, NodeRendererComponent> = {};

    private constructor() {}

    public static getInstance(): NodeRendererManager {
        if (!NodeRendererManager.instance) {
            NodeRendererManager.instance = new NodeRendererManager();
        }
        return NodeRendererManager.instance;
    }

    public register<T>(type: string, renderer: NodeRendererComponent<T>) {
        this.renderers[type] = renderer;
    }

    public getRenderer(type: string) {
        return this.renderers[type];
    }
}

export const nodeRendererManager = NodeRendererManager.getInstance();