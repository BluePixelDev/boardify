import { createContext, useContext, useEffect, useState } from "react"
import { error, info } from "@tauri-apps/plugin-log"
import { PluginDefinition } from "../types"

type PluginModule = {
    pluginDefinition: PluginDefinition
}

interface PluginContextType {
    plugins: Map<string, PluginDefinition>;
    loadPlugin: (pluginId: string) => void;
    unloadPlugin: (pluginId: string) => void;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

export const PluginManager = ({ children }: { children: React.ReactNode }) => {
    const [plugins, setPlugins] = useState<Map<string, PluginDefinition>>(new Map())

    useEffect(() => {
        info("Loading plugins...")
        const plugins = import.meta.glob("@/plugins/**/index.ts", { eager: true })
        const newPlugins = new Map<string, PluginDefinition>()

        Object.values(plugins).forEach((mod) => {
            const pluginModule = mod as PluginModule
            if (pluginModule?.pluginDefinition) {
                const plugin = pluginModule.pluginDefinition;
                newPlugins.set(plugin.id, plugin);

                try {
                    plugin.onRegister?.();
                    info(`Plugin ${plugin.id} registered successfully.`);
                } catch (err) {
                    error(`Error in hooks for plugin ${plugin.id}: ${err}`);
                }
            }
        })

        setPlugins(newPlugins)

        return () => {
            newPlugins.forEach((plugin) => {
                if (plugin.onUnload) {
                    try {
                        plugin.onUnload()
                    } catch (err) {
                        error(`Error in onUnload hook for plugin ${plugin.id}: ${err}`)
                    }
                }
            })
        }
    }, [])

    const loadPlugin = (pluginId: string) => {
        const plugin = plugins.get(pluginId)
        if (plugin) {
            if (plugin.onRegister) {
                try {
                    plugin.onRegister()
                    info(`Plugin ${plugin.id} registered successfully.`)
                } catch (err) {
                    error(`Error in onRegister hook for plugin ${plugin.id}: ${err}`)
                }
            }
        } else {
            error(`Plugin with id ${pluginId} not found.`)
        }
    }

    const unloadPlugin = (pluginId: string) => {
        const plugin = plugins.get(pluginId)
        if (plugin) {
            if (plugin.onUnload) {
                try {
                    plugin.onUnload()
                } catch (err) {
                    error(`Error in onUnload hook for plugin ${plugin.id}: ${err}`)
                }
            }
            setPlugins((prev) => {
                const newPlugins = new Map(prev)
                newPlugins.delete(pluginId)
                return newPlugins
            })
        } else {
            error(`Plugin with id ${pluginId} not found.`)
        }
    }

    return (
        <PluginContext.Provider value={{ plugins, loadPlugin, unloadPlugin }}>
            {children}
        </PluginContext.Provider>
    )
}

export const usePluginManager = (): PluginContextType => {
    const context = useContext(PluginContext);
    if (!context) {
        throw new Error("usePluginManager must be used within a PluginProvider");
    }
    return context;
}
