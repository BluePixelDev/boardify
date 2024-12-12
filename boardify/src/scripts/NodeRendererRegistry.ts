import { NodeData } from "@/components/node-system/NodeLogic";

type NodeRendererComponent<T = any> = (props: { node: NodeData<T> }) => JSX.Element | JSX.Element[];

class NodeRendererManager {
    private static instance: NodeRendererManager;
    private renderers: Record<string, NodeRendererComponent> = {};

    private constructor() {}

    // Singleton pattern to ensure only one instance
    public static getInstance(): NodeRendererManager {
        if (!NodeRendererManager.instance) {
            NodeRendererManager.instance = new NodeRendererManager();
        }
        return NodeRendererManager.instance;
    }

    // Register a new node type renderer
    public register<T>(type: string, renderer: NodeRendererComponent<T>) {
        this.renderers[type] = renderer;
    }

    // Get the renderer for a specific node type
    public getRenderer(type: string) {
        return this.renderers[type];
    }
}

export const nodeRendererManager = NodeRendererManager.getInstance();