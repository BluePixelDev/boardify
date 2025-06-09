import { openProject as _openProject } from "@/redux/app/appSlice";
import type { AppThunk } from "@/redux/types";
import { importResource } from "../utils/projectUtils";

export const createAndOpenProject =
  (name: string, basePath: string): AppThunk =>
  (dispatch) => {
    dispatch(_openProject({ name, basePath }));
  };

export const openProject =
  (name: string, basePath: string): AppThunk =>
  (dispatch) => {
    dispatch(_openProject({ name, basePath }));
  };

export const importResourceToProject =
  (sourcePath: string): AppThunk =>
  (_dispatch, getState) => {
    const { projectRootPath } = getState().app;
    if (!projectRootPath) {
      throw new Error("No project open");
    }
    importResource(sourcePath, projectRootPath);
  };
