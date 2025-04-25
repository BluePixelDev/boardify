import { CommandPalette } from "./CommandPalette";

export default {
  title: "Command Palette/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
};

export const Default = () => <CommandPalette />;
