import { BoardNode } from "@/features/board";
import { useNode } from "@/hooks";
import { getFileFormat } from "@/utils";
import { App } from "@boardify/sdk";
import { importerRegistry } from "../importer";
import { createNodeService } from "../node";
import { rendererRegistry } from "../renderer";
import { store } from "@/redux";

export const app: App = {
  components: {
    BoardNode,
  },
  importers: importerRegistry,
  renderers: rendererRegistry,
  nodeService: createNodeService(store.dispatch),
  utils: {
    getFileFormat,
  },
  hooks: {
    useNode,
  },
};
