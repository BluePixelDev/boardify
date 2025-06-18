import { ImporterEntry, ImportEvent } from "@boardify/sdk";
import { NoSuitableImporterError } from "./types";
import { warn } from "@tauri-apps/plugin-log";

/**
 * A registry to manage and prioritize data importers.
 */
export class ImporterRegistry {
  private importers: ImporterEntry[] = [];

  register(entry: ImporterEntry): void {
    const exists = this.importers.some((imp) => imp.id === entry.id);
    if (exists) {
      warn(
        `[ImporterRegistry] Importer with id "${entry.id}" already registered.`
      );
      return;
    }
    this.importers.push(entry);
    this.importers.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }

  unregister(id: string): void {
    this.importers = this.importers.filter((entry) => entry.id !== id);
  }

  clear(): void {
    this.importers = [];
  }

  get(): ImporterEntry[] {
    return this.importers;
  }

  async import(event: ImportEvent): Promise<void> {
    let handled = false;
    const accept = () => {
      handled = true;
    };

    for (const { handler } of this.importers) {
      await handler(event, accept);
      if (handled) return;
    }

    throw new NoSuitableImporterError(event.file.type, event.file.name);
  }
}

/**
 * A singleton instance of the ImporterRegistry.
 */
export const importerRegistry = new ImporterRegistry();
