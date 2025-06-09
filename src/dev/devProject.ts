import { createAndOpenProject } from "@/features/project";
import { join } from "@tauri-apps/api/path";
import type { AppDispatch } from "@/redux";
import os from "os";

/**
 * In development, create or open a default project folder.
 */
export const setupDevProject = async (dispatch: AppDispatch) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const baseTempDir = await join(os.tmpdir(), "my-app-dev-projects"); // system tmp dir
  const projectName = "DevProject";

  dispatch(createAndOpenProject(projectName, baseTempDir));
};
