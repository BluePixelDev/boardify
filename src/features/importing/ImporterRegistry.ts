import { IImporter, ImportEvent, ImportResult } from "./types";

type ImporterEntry = {
  importer: IImporter;
  priority: number;
};

class ImporterRegistry {
  private importers: ImporterEntry[] = [];

  registerImporter(importer: IImporter, priority = 0) {
    if (!this.importers.includes({ importer, priority })) {
      this.importers.push({ importer, priority });
      this.importers.sort((a, b) => b.priority - a.priority);
    }
  }

  unregisterImporter(importer: IImporter) {
    this.importers = this.importers.filter(
      (entry) => entry.importer !== importer
    );
  }

  clearImporters() {
    this.importers = [];
  }

  getImporters(): ImporterEntry[] {
    return this.importers;
  }

  async import(event: ImportEvent): Promise<ImportResult> {
    const fileBuffer = await event.file.arrayBuffer();

    for (const { importer } of this.importers) {
      if (!importer) {
        continue;
      }

      if (await importer.canHandle(event.file, fileBuffer)) {
        return await importer.importData(event);
      }
    }

    return { success: false, message: "No suitable importer found." };
  }
}

export const importerRegistry = new ImporterRegistry();
