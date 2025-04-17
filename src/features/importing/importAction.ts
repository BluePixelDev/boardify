import { AppThunk } from "@/store"
import { importerRegistry } from "./ImporterRegistry"
import { ImportEvent } from "./types"
import { showErrorToast, showSuccessToast } from "../notifications"

export const importFile = (path: string, position: { x: number, y: number }, file: File): AppThunk => async (dispatch, getState) => {
    const importEvent: ImportEvent = {
        path,
        file,
        position,
        dispatch,
        getState,
    }

    const result = await importerRegistry.import(importEvent)

    if (!result.success) {
        showErrorToast(result.message);
    } else {
        showSuccessToast(result.message);
    }
}