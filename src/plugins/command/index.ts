import { commandRegistry } from "@/features/command-palette";
import { PluginDefinition } from "@/features/plugins";

const plugin: PluginDefinition = {
  id: "command",
  name: "Command Palette",
  description: "A command palette for executing commands quickly.",
  version: "1.0.0",
  onRegister: () => {
    commandRegistry.addCommand({
      id: "exampleCommand",
      name: "Example Command",
      description: "An example command for demonstration purposes.",
      icon: "example-icon",
      shortcut: "Ctrl+E",
      action: async () => {
        alert("Example command executed!");
      },
    });
  },
  onUnregister: () => {
    commandRegistry.removeCommand("exampleCommand");
  },
};

export default plugin;
