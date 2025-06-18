import { error } from "@tauri-apps/plugin-log";
import { showErrorToast } from "@/features/notifications";
import { ImportEvent } from "@boardify/sdk";
import { importerRegistry } from "./ImporterRegistry";
import { NoSuitableImporterError } from "./types";

export const importFile = async (
  path: string,
  position: { x: number; y: number },
  file: File
): Promise<void> => {
  try {
    const importEvent: ImportEvent = {
      path,
      file,
      position,
    };

    await importerRegistry.import(importEvent);
  } catch (e) {
    if (e instanceof NoSuitableImporterError) {
      showErrorToast("Unsupported file type for import.");
    } else {
      showErrorToast("Unexpected import failure.");
    }
    error(
      `Top-level import failure: ${e instanceof Error ? e.message : String(e)}\nStack:\n${e instanceof Error ? e.stack : "No stack available"}`
    );
  }
};
