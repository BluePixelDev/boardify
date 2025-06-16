import { NodeRendererEntry, RendererRegistryInterface } from "@boardify/sdk";

class RendererRegistry implements RendererRegistryInterface {
  private renderers = new Map<string, NodeRendererEntry>();

  registerRenderer(type: string, renderer: NodeRendererEntry) {
    this.renderers.set(type, renderer);
  }

  getRenderer(type: string): NodeRendererEntry | undefined {
    return this.renderers.get(type);
  }

  public removeRenderer(type: string): boolean {
    return this.renderers.delete(type);
  }
}

export const rendererRegistry = new RendererRegistry();
