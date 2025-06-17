import { AppDispatch } from "@/redux";
import { App, Plugin } from "@boardify/sdk";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { corePluginRegistry } from "@boardify/core-plugins";
import { BoardNode, useNode } from "@/features/board";
import { importerRegistry } from "../importer";
import { rendererRegistry } from "../renderer";
import { createNodeService } from "../node";
import { getFileFormat } from "@/utils";

type PluginRegistry = Map<string, Plugin>;
interface PluginContextType {
  plugins: PluginRegistry;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export function PluginProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const registry = useRef<PluginRegistry>(new Map());

  const app: App = {
    components: {
      BoardNode,
    },
    importers: importerRegistry,
    renderers: rendererRegistry,
    nodeService: createNodeService(dispatch),
    utils: {
      getFileFormat,
    },
    hooks: {
      useNode,
    },
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const [id, entry] of Object.entries(corePluginRegistry)) {
        const instance = new entry.plugin(app, entry.manifest);
        await instance.attach?.();
        if (!cancelled) {
          registry.current.set(id, instance);
          console.info(`Core plugin "${id}" initialized.`);
        }
      }
    })();

    return () => {
      cancelled = true;
      for (const [id, plugin] of registry.current.entries()) {
        plugin.detach?.();
        console.info(`Core plugin "${id}" detached.`);
      }
      registry.current.clear();
    };
  }, [dispatch]);

  return (
    <>
      <PluginContext.Provider value={{ plugins: registry.current }}>
        {children}
      </PluginContext.Provider>
    </>
  );
}

export const usePluginManager = () => {
  const ctx = useContext(PluginContext);
  if (!ctx)
    throw new Error("usePluginManager must be used inside PluginProvider");
  return ctx;
};

export function usePlugin<T extends Plugin = Plugin>(
  id: string
): T | undefined {
  const { plugins } = usePluginManager();
  return plugins.get(id) as T | undefined;
}
