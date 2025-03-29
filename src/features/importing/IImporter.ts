import { Dispatch } from "@reduxjs/toolkit";

export type ImportEvent = {
    file: File;
    dispatch: Dispatch;
    position: { x: number; y: number };
};

export class IImporter {
    constructor() {
        if (new.target === IImporter) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    importData(_event: ImportEvent) {
        throw new Error("importData method must be implemented.");
    }

    getSupportedFormats(): string[] {
        throw new Error("getSupportedFormats method must be implemented.");
    }
}