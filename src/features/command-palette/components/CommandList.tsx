import { commandRegistry } from "../CommandRegistry";
import { useCommands } from "../hooks/useCommands";

export const CommandList = () => {
  const commands = useCommands();

  function executeCommand(id: string) {
    commandRegistry.executeCommand(id);
  }

  return (
    <div className="command-list">
      <h1>Command List</h1>
      {commands.map((command) => (
        <button key={command.id} onClick={() => executeCommand(command.id)}>
          {command.name}
        </button>
      ))}
    </div>
  );
};
