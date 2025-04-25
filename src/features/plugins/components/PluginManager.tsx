import { createContext, useContext, useEffect, useState } from "react";
import { error, info } from "@tauri-apps/plugin-log";
import { PluginDefinition } from "../types";

type PluginModule = {
  default: PluginDefinition;
};

interface PluginContextType {
  plugins: Map<string, PluginDefinition>;
  loadPlugin: (pluginId: string) => void;
  unloadPlugin: (pluginId: string) => void;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const PluginManager = ({ children }: { children: React.ReactNode }) => {
  const [plugins, setPlugins] = useState<Map<string, PluginDefinition>>(
    new Map()
  );

  useEffect(() => {
    info("Loading plugins...");
    const modules = import.meta.glob("@/plugins/**/index.ts", { eager: true });
    const loadedPlugins = new Map<string, PluginDefinition>();

    Object.values(modules).forEach((mod) => {
      const pluginModule = mod as PluginModule;
      const plugin = pluginModule.default;
      if (plugin) {
        loadedPlugins.set(plugin.id, plugin);
        try {
          plugin.onRegister?.();
          info(`Plugin ${plugin.id} registered successfully.`);
        } catch (err) {
          error(`Error registering plugin ${plugin.id}: ${err}`);
        }
      }
    });

    setPlugins(loadedPlugins);

    return () => {
      loadedPlugins.forEach((plugin) => {
        if (plugin.onUnload) {
          try {
            plugin.onUnload();
          } catch (err) {
            error(`Error in onUnload hook for plugin ${plugin.id}: ${err}`);
          }
        }
      });
    };
  }, []);

  const loadPlugin = (pluginId: string) => {
    if (!plugins.has(pluginId)) {
      error(`Plugin with id ${pluginId} not found.`);
      return;
    }
    const plugin = plugins.get(pluginId)!;
    try {
      plugin.onRegister?.();
      info(`Plugin ${plugin.id} registered successfully.`);
    } catch (err) {
      error(`Error in onRegister for plugin ${plugin.id}: ${err}`);
    }
  };

  const unloadPlugin = (pluginId: string) => {
    if (!plugins.has(pluginId)) {
      error(`Plugin with id ${pluginId} not found.`);
      return;
    }
    const plugin = plugins.get(pluginId)!;
    try {
      plugin.onUnload?.();
    } catch (err) {
      error(`Error in onUnload for plugin ${plugin.id}: ${err}`);
    }
    setPlugins((prev) => {
      const updated = new Map(prev);
      updated.delete(pluginId);
      return updated;
    });
  };

  return (
    <PluginContext.Provider value={{ plugins, loadPlugin, unloadPlugin }}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginManager = (): PluginContextType => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePluginManager must be used within a PluginProvider");
  }
  return context;
};
