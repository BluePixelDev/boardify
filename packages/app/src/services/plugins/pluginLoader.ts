import { readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { error } from "console";
import path from "path";
import { Plugin, PluginManifest } from "@boardify/sdk";

export type ManifestEntry = {
  manifest: PluginManifest;
  pluginDir: string;
};

export async function loadManifests(baseDir: string): Promise<ManifestEntry[]> {
  const results: ManifestEntry[] = [];
  let entries;
  try {
    entries = await readDir(baseDir);
  } catch (e) {
    error(`Failed to read plugin directory "${baseDir}": ${e}`);
    return [];
  }

  for (const entry of entries) {
    if (!entry.name || !entry.isDirectory) continue;

    const pluginDir = await join(baseDir, entry.name);
    const manifestPath = await join(pluginDir, "manifest.json");

    try {
      const json = await readTextFile(manifestPath);
      const manifest = JSON.parse(json) as PluginManifest;
      if (manifest.id && manifest.main) {
        results.push({ manifest, pluginDir });
      } else {
        error(`Invalid manifest in "${manifestPath}": missing id or main`);
      }
    } catch (e) {
      error(`Failed loading manifest at "${manifestPath}": ${e}`);
    }
  }
  return results;
}

export async function loadPluginFromManifest(
  entry: ManifestEntry
): Promise<Plugin | undefined> {
  const { manifest, pluginDir } = entry;
  const entryPath = path.join(pluginDir, manifest.main);
  try {
    const mod = await import(/* @vite-ignore */ `local://${entryPath}`);
    if (mod && typeof mod === "object" && "default" in mod) {
      return (mod as { default: Plugin }).default;
    } else {
      error(`Plugin "${manifest.id}" has no default export.`);
    }
  } catch (e) {
    error(`Error loading plugin "${manifest.id}": ${e}`);
    return undefined;
  }
}
