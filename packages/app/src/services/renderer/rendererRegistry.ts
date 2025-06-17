import { NodeRendererEntry } from "@boardify/sdk";

class RendererRegistry {
  private renderers = new Map<string, NodeRendererEntry>();

  register(type: string, renderer: NodeRendererEntry) {
    this.renderers.set(type, renderer);
  }

  get(type: string): NodeRendererEntry | undefined {
    return this.renderers.get(type);
  }

  public unregister(type: string): boolean {
    return this.renderers.delete(type);
  }
}

export const rendererRegistry = new RendererRegistry();
