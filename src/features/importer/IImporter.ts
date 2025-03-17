import { Dispatch } from "@reduxjs/toolkit";

export class IImporter {
    constructor() {
        if (new.target === IImporter) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    importData(_file: File, _dispatch: Dispatch) {
        throw new Error("importData method must be implemented.");
    }

    getSupportedFormats(): string[] {
        throw new Error("getSupportedFormats method must be implemented.");
    }
}