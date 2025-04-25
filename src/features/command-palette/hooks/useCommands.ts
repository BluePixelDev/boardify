import { useEffect, useState } from "react";
import { Command } from "../types";
import { commandRegistry } from "../CommandRegistry";

export function useCommands(): Command[] {
  const [commands, setCommands] = useState<Command[]>(
    commandRegistry.getCommands()
  );

  useEffect(() => {
    const update = (cmds: Command[]) => setCommands(cmds);
    commandRegistry.on("commandAdded", update);
    commandRegistry.on("commandRemoved", update);

    return () => {
      commandRegistry.off("commandAdded", update);
      commandRegistry.off("commandRemoved", update);
    };
  }, []);

  return commands;
}
