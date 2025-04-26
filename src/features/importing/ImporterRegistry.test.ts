import { describe, it, expect, beforeEach, vi } from "vitest";
import { importerRegistry } from "./ImporterRegistry";
import { ImportEvent, IImporter } from "./types";
import { RootState } from "@/store";

const mockState = {} as unknown as RootState;

describe("ImporterRegistry", () => {
  let mockFile: unknown & File;
  let arrayBufferMock: ArrayBuffer;
  let importEvent: ImportEvent;

  let mockImporter: IImporter;
  let fallbackImporter: IImporter;

  beforeEach(() => {
    arrayBufferMock = new ArrayBuffer(8);

    mockFile = {
      name: "test.txt",
      arrayBuffer: vi.fn().mockResolvedValue(arrayBufferMock),
    } as unknown as File;

    vi.spyOn(mockFile, "arrayBuffer").mockResolvedValue(arrayBufferMock);

    importEvent = {
      file: mockFile,
      path: "/mock/path",
      position: { x: 10, y: 20 },
      dispatch: vi.fn(),
      getState: vi.fn(() => mockState),
    };

    importerRegistry.clearImporters();

    mockImporter = {
      canHandle: vi.fn().mockResolvedValue(true),
      importData: vi.fn().mockResolvedValue({
        success: true,
        message: "Handled by mockImporter",
      }),
    };

    fallbackImporter = {
      canHandle: vi.fn().mockResolvedValue(false),
      importData: vi.fn(),
    };
  });

  it("registers and sorts importers by priority", () => {
    importerRegistry.registerImporter(mockImporter, 1);
    importerRegistry.registerImporter(fallbackImporter, 10);

    const importers = importerRegistry.getImporters();
    expect(importers.length).toBe(2);
    expect(importers[0].importer).toBe(fallbackImporter); // highest priority first
  });

  it("unregisters an importer", () => {
    importerRegistry.registerImporter(mockImporter, 1);
    importerRegistry.unregisterImporter(mockImporter);

    const importers = importerRegistry.getImporters();
    expect(importers.length).toBe(0);
  });

  it("uses the first importer that can handle the file", async () => {
    importerRegistry.registerImporter(fallbackImporter, 1);
    importerRegistry.registerImporter(mockImporter, 5);

    const result = await importerRegistry.import(importEvent);

    expect(mockFile.arrayBuffer).toHaveBeenCalledOnce();
    expect(mockImporter.canHandle).toHaveBeenCalledWith(
      mockFile,
      arrayBufferMock
    );
    expect(mockImporter.importData).toHaveBeenCalledWith(importEvent);
    expect(result).toEqual({
      success: true,
      message: "Handled by mockImporter",
    });
  });

  it("returns failure when no importer can handle the file", async () => {
    importerRegistry.registerImporter(fallbackImporter, 1);

    const result = await importerRegistry.import(importEvent);

    expect(result.success).toBe(false);
    expect(result.message).toBe("No suitable importer found.");
    expect(fallbackImporter.importData).not.toHaveBeenCalled();
  });
});
