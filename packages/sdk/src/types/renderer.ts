export interface NodeRendererProps {
  nodeId: string;
}

export type NodeRendererEntry = (
  props: NodeRendererProps
) => JSX.Element | null;

export interface RendererRegistryInterface {
  registerRenderer(type: string, renderer: NodeRendererEntry): void;
  getRenderer(type: string): NodeRendererEntry | undefined;
  removeRenderer(type: string): boolean;
}
