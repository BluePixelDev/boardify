import { AppThunk } from "@/redux";
import { importerRegistry, NoSuitableImporterError } from "./ImporterRegistry";
import { ImportEvent } from "./types";
import { showErrorToast } from "../notifications";
import { error } from "@tauri-apps/plugin-log";

export const importFile =
  (path: string, position: { x: number; y: number }, file: File): AppThunk =>
  async (dispatch, getState) => {
    try {
      const importEvent: ImportEvent = {
        path,
        file,
        position,
        dispatch,
        getState,
      };

      await importerRegistry.import(importEvent);
    } catch (e) {
      if (e instanceof NoSuitableImporterError) {
        showErrorToast("Unsupported file type for import.");
      } else {
        showErrorToast("Unexpected import failure.");
      }
      error(
        `Top-level import failure: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  };
