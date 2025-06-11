import { IImporter, ImportEvent } from "./types";

/**
 * Represents an importer entry with an associated priority.
 */
type ImporterEntry = {
  importer: IImporter;
  priority: number;
};

/**
 * Custom error thrown when no suitable importer is found for a file.
 */
export class NoSuitableImporterError extends Error {
  constructor(fileType: string, fileName: string) {
    super(`No importer found for file type: ${fileType} (${fileName})`);
    this.name = "NoSuitableImporterError";
  }
}

/**
 * A registry to manage and prioritize data importers.
 */
class ImporterRegistry {
  private importers: ImporterEntry[] = [];

  /**
   * Registers an importer with an optional priority.
   * Higher priority importers are checked first.
   * @param importer The importer to register.
   * @param priority The priority level (default is 0).
   */
  registerImporter(importer: IImporter, priority = 0): void {
    // Avoid duplicate entries by checking existing importers.
    if (!this.importers.some((entry) => entry.importer === importer)) {
      this.importers.push({ importer, priority });
      this.importers.sort((a, b) => b.priority - a.priority);
    }
  }

  /**
   * Unregisters a previously registered importer.
   * @param importer The importer to remove.
   */
  unregisterImporter(importer: IImporter): void {
    this.importers = this.importers.filter(
      (entry) => entry.importer !== importer
    );
  }

  /**
   * Clears all registered importers.
   */
  clearImporters(): void {
    this.importers = [];
  }

  /**
   * Returns the list of currently registered importers.
   * @returns An array of importer entries.
   */
  getImporters(): ImporterEntry[] {
    return this.importers;
  }

  /**
   * Attempts to import data using the registered importers.
   * Importers are checked in order of their priority.
   * @param event The import event containing the file.
   * @throws Will throw a NoSuitableImporterError if no importer can handle the file.
   */
  async import(event: ImportEvent): Promise<void> {
    const fileBuffer = await event.file.arrayBuffer();

    for (const { importer } of this.importers) {
      if (await importer.canHandle(event.file, fileBuffer)) {
        await importer.importData(event);
        return;
      }
    }

    throw new NoSuitableImporterError(event.file.type, event.file.name);
  }
}

/**
 * A singleton instance of the ImporterRegistry.
 */
export const importerRegistry = new ImporterRegistry();
