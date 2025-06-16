import { AppDispatch } from "@/redux";
import { PluginDefinition } from "@boardify/sdk";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { corePluginRegistry } from "@boardify/core-plugins";
import { SdkInitializer } from "./SdkInitializer";

type PluginRegistry = Map<string, PluginDefinition>;
interface PluginContextType {
  plugins: PluginRegistry;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export function PluginProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const registry = useRef<PluginRegistry>(new Map());

  useEffect(() => {
    for (const [id, entry] of Object.entries(corePluginRegistry)) {
      entry.plugin.attach();
      registry.current.set(id, entry.plugin);
      console.info(`Core plugin "${id}" initialized.`);
    }

    return () => {
      for (const [id, plugin] of registry.current.entries()) {
        plugin.detach?.();
        console.info(`Core plugin "${id}" detached.`);
      }
      registry.current.clear();
    };
  }, [dispatch]);

  return (
    <>
      <SdkInitializer />
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

export function usePlugin<T extends PluginDefinition = PluginDefinition>(
  id: string
): T | undefined {
  const { plugins } = usePluginManager();
  return plugins.get(id) as T | undefined;
}
