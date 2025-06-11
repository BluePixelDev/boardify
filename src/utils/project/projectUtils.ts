import { exists, mkdir, copyFile } from "@tauri-apps/plugin-fs";
import { basename, join } from "@tauri-apps/api/path";

export const createProject = async (name: string, basePath: string) => {
  const projectPath = await join(basePath, name);
  const projectExists = await exists(projectPath);
  if (!projectExists) {
    await mkdir(projectPath, { recursive: true });
  }
  return projectPath;
};

export const importResource = async (
  resourcePath: string,
  projectPath: string
) => {
  const fileName = await basename(resourcePath);
  const destPath = await join(projectPath, fileName);

  await copyFile(resourcePath, destPath);
  return destPath;
};
