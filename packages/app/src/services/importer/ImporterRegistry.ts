import { ImporterEntry, ImporterHandler, ImportEvent } from "@boardify/sdk";
import { NoSuitableImporterError } from "./types";

/**
 * A registry to manage and prioritize data importers.
 */
class ImporterRegistry {
  private importers: ImporterEntry[] = [];

  register(handler: ImporterHandler, priority = 0): void {
    if (!this.importers.some((entry) => entry.handler === handler)) {
      this.importers.push({ handler, priority });
      this.importers.sort((a, b) => b.priority - a.priority);
    }
  }

  unregister(handler: ImporterHandler): void {
    this.importers = this.importers.filter(
      (entry) => entry.handler !== handler
    );
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
