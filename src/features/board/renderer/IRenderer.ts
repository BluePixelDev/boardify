import { BoardNodeData } from "../store";

export interface IRenderer<T = unknown> {
  render: (node: BoardNodeData<T>) => JSX.Element | null;
}

export interface IRendererRegistry {
  registerRenderer: (nodeType: string, renderer: IRenderer) => void;
  getRenderer: (nodeType: string) => IRenderer | null;
  removeRenderer: (nodeType: string) => void;
}
