export interface PluginDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  onRegister?: () => void;
  onUnload?: () => void;

  [key: string]: unknown;
}
