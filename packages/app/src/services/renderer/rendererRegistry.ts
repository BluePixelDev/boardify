import { NodeData, NodeRendererEntry } from "@boardify/sdk";
import { warn } from "@tauri-apps/plugin-log";
import { ComponentType } from "react";

/**
 * A registry to manage dynamic node renderers with priority and ID.
 */
class RendererRegistry {
  private entries: NodeRendererEntry[] = [];

  register(entry: NodeRendererEntry) {
    const exists = this.entries.some((e) => e.id === entry.id);
    if (exists) {
      warn(
        `[RendererRegistry] Renderer with id "${entry.id}" already registered.`
      );
      return;
    }
    this.entries.push(entry);
    this.entries.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }

  clear(): void {
    this.entries = [];
  }

  getRendererForNode(
    node: NodeData
  ): ComponentType<{ nodeId: string }> | undefined {
    return this.entries.find((entry) => entry.match(node.type))?.component;
  }

  unregister(id: string): void {
    this.entries = this.entries.filter((entry) => entry.id !== id);
  }
}

export const rendererRegistry = new RendererRegistry();
