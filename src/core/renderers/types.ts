export interface IRenderer {
  render: (nodeId: string) => JSX.Element | null;
}
