// Core Event Types

import { NodeData, NodeSize, UseNodeResult } from "board";

export interface PrioritizedEntry {
  id: string;
  priority?: number;
}

export type ImportEvent = {
  path: string;
  file: File;
  position: { x: number; y: number };
};

export type ImporterHandler = (
  event: ImportEvent,
  accept: () => void
) => Promise<void>;

export interface NodeRendererProps {
  nodeId: string;
}

export interface ImporterEntry extends PrioritizedEntry {
  handler: ImporterHandler;
}

export interface NodeRendererEntry extends PrioritizedEntry {
  match: (type: string) => boolean;
  component: React.ComponentType<{ nodeId: string }>;
}

// Node Creation Utilities

export type CreateNodeFromImportEventFn = <T>(
  importEvent: ImportEvent,
  size: NodeSize,
  partialNode: Omit<
    NodeData<T>,
    "id" | "position" | "layerId" | "size" | "zIndex"
  > &
    Partial<Pick<NodeData<T>, "aspectLocked">>
) => NodeData<T>;

export type CreateBaseNodeFn = <T>(
  overrides: Omit<NodeData<T>, "id" | "zIndex" | "aspectLocked"> &
    Partial<Pick<NodeData<T>, "aspectLocked" | "zIndex">>
) => NodeData<T>;

// File Format Detection

export type GetFileFormatFn = (
  buffer: ArrayBuffer
) => Promise<string | undefined>;

// Main Application Interface

export interface App {
  importers: {
    register: (entry: ImporterEntry) => void;
    unregister: (id: string) => void;
  };
  renderers: {
    register: (entry: NodeRendererEntry) => void;
    unregister: (id: string) => void;
  };
  nodeService: {
    addNode: <T>(node: NodeData<T>) => void;
    removeNode: (id: string) => void;
    updateNode: <T>(id: string, patch: Partial<NodeData<T>>) => void;
    createNodeFromImportEvent: CreateNodeFromImportEventFn;
  };
  hooks: {
    useNode: <T = unknown>(nodeId: string) => UseNodeResult<T>;
  };
  utils: {
    getFileFormat: (buffer: ArrayBuffer) => Promise<string | undefined>;
  };
  components: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BoardNode: React.ComponentType<any>;
  };
}

// Plugin System

export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  main: string;
  homepage?: string;
};

export abstract class Plugin {
  readonly app: App;
  readonly manifest: PluginManifest;

  constructor(app: App, manifest: PluginManifest) {
    this.app = app;
    this.manifest = manifest;
  }

  abstract attach(): void | Promise<void>;
  abstract detach?(): void | Promise<void>;
}

export type WithApp<T> = T & { app: App };
