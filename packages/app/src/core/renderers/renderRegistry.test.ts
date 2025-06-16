import { vi } from "vitest";
import { rendererRegistry } from "./rendererRegistry";
import { NodeRendererEntry } from "./types";

describe("Render Registry", () => {
  it("Can Add Renderer", () => {
    const renderMock = vi.fn();
    const renderer: NodeRendererEntry = {
      render: renderMock.mockRejectedValue(true),
    };
    rendererRegistry.registerRenderer("test", { render: renderMock });
    const retrievedRenderer = rendererRegistry.getRenderer("test");

    expect(retrievedRenderer === renderer);
    expect(retrievedRenderer !== null);

    retrievedRenderer?.render({ nodeId: "" });

    expect(renderMock).toHaveBeenCalled();
  });

  it("Can Remove Renderer", () => {
    const renderer: NodeRendererEntry = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_nodeId) => {
        return null;
      },
    };
    rendererRegistry.registerRenderer("test", renderer);
    let retrievedRenderer = rendererRegistry.getRenderer("test");
    rendererRegistry.removeRenderer("test");
    expect(retrievedRenderer !== null);

    retrievedRenderer = rendererRegistry.getRenderer("test");
    expect(retrievedRenderer === null);
  });
});
