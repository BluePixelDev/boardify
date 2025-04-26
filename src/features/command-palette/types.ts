import { AppDispatch, RootState } from "@/store";

export interface Command {
  id: string;
  name: string;
  description: string;
  icon?: string;
  shortcut?: string;
  action: (
    ctx: {
      dispatch: AppDispatch;
      getState: () => RootState;
    },
    args: string[]
  ) => void | Promise<void>;
}

export interface ICommandRegistry {
  addCommand(command: Command): void;
  removeCommand(commandId: string): void;
  hasCommand(commandId: string): boolean;
  getCommands(): Command[];
  executeCommand(commandId: string, args: string[]): void;
}
