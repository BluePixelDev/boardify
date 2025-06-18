import { rendererRegistry } from "./rendererRegistry";
import { NodeData, NodeRendererEntry } from "@boardify/sdk";
import React from "react";

const DummyComponent: React.FC<{ nodeId: string }> = () => null;
const nodeA: NodeData = {
  id: "node-a",
  type: "type-a",
  layerId: "layer-1",
  zIndex: 0,
  position: { x: 0, y: 0 },
  size: { width: 100, height: 100 },
  data: {},
};

const entryA: NodeRendererEntry = {
  id: "renderer-a",
  component: DummyComponent,
  match: (node) => node.type === "type-a",
  priority: 10,
};

const entryB: NodeRendererEntry = {
  id: "renderer-b",
  component: DummyComponent,
  match: (node) => node.type === "type-a",
  priority: 5,
};

describe("RendererRegistry", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rendererRegistry as any).entries = [];
  });

  it("registers and retrieves the correct renderer", () => {
    rendererRegistry.register(entryA);
    const result = rendererRegistry.getRendererForNode(nodeA);
    expect(result?.id).toBe("renderer-a");
  });

  it("sorts renderers by descending priority", () => {
    rendererRegistry.register(entryB);
    rendererRegistry.register(entryA); // Higher priority

    const result = rendererRegistry.getRendererForNode(nodeA);
    expect(result?.id).toBe("renderer-a"); // Should pick the one with higher priority
  });

  it("unregisters a renderer by id", () => {
    rendererRegistry.register(entryA);
    rendererRegistry.unregister("renderer-a");

    const result = rendererRegistry.getRendererForNode(nodeA);
    expect(result).toBeUndefined();
  });

  it("returns undefined when no match is found", () => {
    const nonMatchingNode: NodeData = {
      ...nodeA,
      type: "unknown-type",
    };

    rendererRegistry.register(entryA);
    const result = rendererRegistry.getRendererForNode(nonMatchingNode);
    expect(result).toBeUndefined();
  });
});
