import { Dispatch } from "@reduxjs/toolkit";

export type ImportEvent = {
    file: File;
    dispatch: Dispatch;
    position: { x: number; y: number };
};

export abstract class IImporter {
    constructor() {
        if (new.target === IImporter) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    abstract importData(event: ImportEvent): void
    abstract getSupportedFormats(): string[]
}