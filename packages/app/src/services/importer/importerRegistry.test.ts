import { ImportEvent } from "@boardify/sdk";
import { ImporterRegistry } from "./ImporterRegistry"; // adjust path as needed
import { NoSuitableImporterError } from "./types";

describe("ImporterRegistry", () => {
  let registry: ImporterRegistry;

  beforeEach(() => {
    registry = new ImporterRegistry();
  });

  test("register adds an importer and sorts by priority", () => {
    const importerA = { id: "a", priority: 5, handler: jest.fn() };
    const importerB = { id: "b", priority: 10, handler: jest.fn() };

    registry.register(importerA);
    registry.register(importerB);

    const importers = registry.get();
    expect(importers).toHaveLength(2);
    expect(importers[0].id).toBe("b"); // higher priority first
    expect(importers[1].id).toBe("a");
  });

  test("register warns and ignores duplicate ids", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const importer = { id: "a", priority: 1, handler: jest.fn() };

    registry.register(importer);
    registry.register(importer); // duplicate

    expect(registry.get()).toHaveLength(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `[ImporterRegistry] Importer with id "a" already registered.`
      )
    );

    warnSpy.mockRestore();
  });

  test("unregister removes importer by id", () => {
    const importer = { id: "a", priority: 1, handler: jest.fn() };

    registry.register(importer);
    expect(registry.get()).toHaveLength(1);

    registry.unregister("a");
    expect(registry.get()).toHaveLength(0);
  });

  test("clear removes all importers", () => {
    registry.register({ id: "a", priority: 1, handler: jest.fn() });
    registry.register({ id: "b", priority: 2, handler: jest.fn() });

    expect(registry.get()).toHaveLength(2);
    registry.clear();
    expect(registry.get()).toHaveLength(0);
  });

  test("import calls handlers in priority order until one accepts", async () => {
    const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
    const event: ImportEvent = {
      file: mockFile,
      path: "",
      position: { x: 0, y: 0 },
    };

    let firstAccepted = false;
    const handler1 = jest.fn(async () => {
      // Doesn't accept
    });
    const handler2 = jest.fn(async (_evt, accept) => {
      accept();
      firstAccepted = true;
    });
    const handler3 = jest.fn(async () => {
      // Should not be called because handler2 accepted
    });

    registry.register({ id: "1", priority: 1, handler: handler1 });
    registry.register({ id: "2", priority: 2, handler: handler2 });
    registry.register({ id: "3", priority: 0, handler: handler3 });

    await registry.import(event);

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
    expect(firstAccepted).toBe(true);
  });

  test("import throws NoSuitableImporterError if none accept", async () => {
    const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
    const event: ImportEvent = {
      file: mockFile,
      path: "",
      position: { x: 0, y: 0 },
    };

    const handler = jest.fn(async () => {
      // never calls accept
    });

    registry.register({ id: "1", priority: 1, handler });

    await expect(registry.import(event)).rejects.toThrow(
      NoSuitableImporterError
    );
  });
});
