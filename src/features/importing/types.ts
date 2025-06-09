import { RootState } from "@/redux";
import { Dispatch } from "@reduxjs/toolkit";

export type ImportEvent = {
  path: string;
  file: File;
  position: { x: number; y: number };
  dispatch: Dispatch;
  getState: () => RootState;
};

export interface IImporter {
  canHandle(file: File, content: ArrayBuffer): Promise<boolean>;
  importData(event: ImportEvent): Promise<void>;
}
