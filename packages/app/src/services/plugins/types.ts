export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  main: string;
  homepage?: string;
};

export type ManifestEntry = {
  manifest: PluginManifest;
  pluginDir: string;
};
