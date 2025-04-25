import { RootState } from "@/store";
import { Dispatch } from "@reduxjs/toolkit";

export type ImportEvent = {
  path: string;
  file: File;
  position: { x: number; y: number };
  dispatch: Dispatch;
  getState: () => RootState;
};

export type ImportResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export interface IImporter {
  canHandle(file: File, content: ArrayBuffer): Promise<boolean>;
  importData(event: ImportEvent): Promise<ImportResult>;
}
