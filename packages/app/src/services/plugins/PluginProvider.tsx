import { Plugin, PluginManifest } from "@boardify/sdk";
import { createContext, useContext, useEffect, useRef } from "react";
import { corePluginRegistry } from "@boardify/core-plugins";
import { app } from "./app";

type PluginWithManifest = {
  instance: Plugin;
  manifest: PluginManifest;
};

type PluginRegistry = Map<string, PluginWithManifest>;
interface PluginContextType {
  plugins: PluginRegistry;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export function PluginProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<PluginRegistry>(new Map());

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const [id, entry] of Object.entries(corePluginRegistry)) {
        const instance = new entry.plugin(app, entry.manifest);
        await instance.attach?.();
        if (!cancelled) {
          registry.current.set(id, { instance, manifest: entry.manifest });
          console.info(`Core plugin "${id}" initialized.`);
        }
      }
    })();

    return () => {
      cancelled = true;
      for (const [id, { instance }] of registry.current.entries()) {
        instance.detach?.();
        console.info(`Core plugin "${id}" detached.`);
      }
      registry.current.clear();
    };
  }, []);

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
