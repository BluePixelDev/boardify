import { IRenderer } from "./types";

class RendererRegistry {
  private renderers: Record<string, IRenderer> = {};

  public registerRenderer(type: string, renderer: IRenderer): void {
    this.renderers[type] = renderer;
  }

  public getRenderer(type: string): IRenderer | null {
    if (Object.prototype.hasOwnProperty.call(this.renderers, type)) {
      return this.renderers[type];
    }

    return null;
  }

  public removeRenderer(type: string): void {
    delete this.renderers[type];
  }
}

export const rendererRegistry = new RendererRegistry();
