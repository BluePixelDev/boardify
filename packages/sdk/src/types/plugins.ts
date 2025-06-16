import { ImporterHandler } from "./importer";

export interface PluginContext {
  importers: {
    register: (handler: ImporterHandler, priority?: number) => void;
    unregister: (handler: ImporterHandler) => void;
  };
  renderers: {
    register: (type: string, component: React.ComponentType) => void;
    unregister: (type: string) => void;
  };
}

export interface PluginDefinition {
  attach: () => void;
  detach?: () => void;
}

export type PluginModule = {
  default: PluginDefinition;
};
