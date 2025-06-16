import { Dispatch } from "@reduxjs/toolkit";

/**
 * Event passed to importers.
 */
export type ImportEvent<TState = unknown, TDispatch = Dispatch> = {
  path: string;
  file: File;
  position: { x: number; y: number };
  dispatch: TDispatch;
  getState: () => TState;
};

export interface ImporterRegistryInterface {
  /**
   * Register an importer handler with optional priority.
   * Higher priority handlers run first.
   */
  registerImporter(handler: ImporterHandler, priority?: number): void;
  /**
   * Unregister a previously registered handler.
   */
  unregisterImporter(handler: ImporterHandler): void;
  /**
   * Clears all registered importers.
   */
  clearImporters(): void;
  /**
   * Returns the list of currently registered importers.
   * @returns An array of importer entries.
   */
  getImporters(): ImporterEntry[];
  /**
   * Attempts to import data using registered handlers in priority order.
   * Throws NoSuitableImporterError if none handle the event.
   */
  import(event: ImportEvent): Promise<void>;
}

/**
 * The signature for an importer handler function.
 * It receives the import event and an `accept` callback.
 * If the importer handles the event, it calls `accept()`.
 */
export type ImporterHandler = (
  event: ImportEvent,
  accept: () => void
) => Promise<void>;

/**
 * An entry in the importer registry with a handler and priority.
 */
export type ImporterEntry = {
  handler: ImporterHandler;
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
