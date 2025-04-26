import { vitest } from "vitest";
import { CommandRegistry } from "./CommandRegistry";

describe("Command Registry", () => {
  let commandRegistry: CommandRegistry;
  beforeEach(() => {
    commandRegistry = new CommandRegistry();
  });
  it("adds commands properly", () => {
    commandRegistry.addCommand({
      id: "Test Command",
      name: "",
      description: "",
      action: () => {},
    });

    expect(commandRegistry.hasCommand("Test Command"));
  });

  it("removes command properly", () => {
    commandRegistry.addCommand({
      id: "Test Command",
      name: "",
      description: "",
      action: () => {},
    });

    expect(commandRegistry.hasCommand("Test Command"));
    commandRegistry.removeCommand("Test Command");
    expect(!commandRegistry.hasCommand("Test Command"));
  });

  it("executes command properly", () => {
    const vn = vitest.fn();
    commandRegistry.addCommand({
      id: "Test Command",
      name: "",
      description: "",
      action: vn,
    });

    commandRegistry.executeCommand("Test Command", []);
    expect(vn).toHaveBeenCalled();
  });
});
