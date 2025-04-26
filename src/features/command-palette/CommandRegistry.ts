import { store } from "@/store";
import { Command, ICommandRegistry } from "./types";

type CommandRegistryEvent = "commandAdded" | "commandRemoved";
type CommandRegistryListener = (commands: Command[]) => void;

export class CommandRegistry implements ICommandRegistry {
  private commands: Map<string, Command>;
  private listeners = new Map<
    CommandRegistryEvent,
    Set<CommandRegistryListener>
  >();

  constructor() {
    this.commands = new Map<string, Command>();
  }

  private emit(event: CommandRegistryEvent) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    const commands = this.getCommands();
    for (const listener of listeners) {
      listener(commands);
    }
  }

  on(event: CommandRegistryEvent, listener: CommandRegistryListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off(event: CommandRegistryEvent, listener: CommandRegistryListener) {
    this.listeners.get(event)?.delete(listener);
  }

  async executeCommand(commandId: string, args: string[]): Promise<void> {
    const command = this.commands.get(commandId);
    if (!command) {
      throw new Error(`Command with id ${commandId} does not exist.`);
    }
    await command.action(
      {
        dispatch: store.dispatch,
        getState: store.getState,
      },
      args
    );
  }

  addCommand(command: Command): void {
    if (this.commands.has(command.id)) {
      throw new Error(`Command with id ${command.id} already exists.`);
    }
    this.commands.set(command.id, command);
    this.emit("commandAdded");
  }

  removeCommand(commandId: string): void {
    if (!this.commands.has(commandId)) {
      throw new Error(`Command with id ${commandId} does not exist.`);
    }
    this.commands.delete(commandId);
    this.emit("commandRemoved");
  }

  hasCommand(commandId: string): boolean {
    return this.commands.has(commandId);
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }
}

export const commandRegistry = new CommandRegistry();
