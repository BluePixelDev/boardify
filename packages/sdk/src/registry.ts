import {
  CreateBaseNodeFn,
  CreateNodeFromImportEventFn,
  GetFileFormatFn,
  ImporterRegistryInterface,
  NodeService,
  UseNodeResult,
} from "./types";
import { RendererRegistryInterface } from "./types/renderer";

type HookRegistry = {
  useNode: <T = unknown>(nodeId: string) => UseNodeResult<T>;
};

type ComponentRegistry = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BoardNode: React.ComponentType<any>;
};

type ServiceRegistry = {
  import: ImporterRegistryInterface;
  render: RendererRegistryInterface;
  nodeService: NodeService;
};

type UtilityRegistry = {
  createNodeFromImportEvent: CreateNodeFromImportEventFn;
  createBaseNode: CreateBaseNodeFn;
  getFileFormat: GetFileFormatFn;
};

type SharedRegistry = {
  components: ComponentRegistry;
  hooks: HookRegistry;
  services: ServiceRegistry;
  utils: UtilityRegistry;
};

const registry: SharedRegistry = {
  components: null!,
  hooks: null!,
  services: null!,
  utils: null!,
};

export const registerComponents = (components: ComponentRegistry) => {
  registry.components = { ...registry.components, ...components };
};

export const registerHooks = (hooks: HookRegistry) => {
  registry.hooks = { ...registry.hooks, ...hooks };
};

export const registerServices = (services: ServiceRegistry) => {
  registry.services = { ...registry.services, ...services };
};

export const registerUtilities = (utils: UtilityRegistry) => {
  registry.utils = { ...registry.utils, ...utils };
};

export const sdk = {
  get components() {
    return registry.components;
  },
  get hooks() {
    return registry.hooks;
  },
  get services() {
    return registry.services;
  },
  get utils() {
    return registry.utils;
  },
};
