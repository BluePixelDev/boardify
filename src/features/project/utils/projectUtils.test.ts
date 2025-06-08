import fs from "fs-extra";
import path from "path";
import { createProject, importResource } from "./projectUtils";

const TEMP_DIR = path.resolve(__dirname, "temp_test_dir");

beforeAll(() => {
  fs.mkdirpSync(TEMP_DIR);
});

afterAll(() => {
  fs.removeSync(TEMP_DIR);
});

describe("projectUtils", () => {
  it("creates a new project folder", () => {
    const projectName = "TestProject";
    const projectPath = createProject(projectName, TEMP_DIR);

    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.lstatSync(projectPath).isDirectory()).toBe(true);
  });

  it("imports a file into the project", () => {
    const projectName = "ImportProject";
    const projectPath = createProject(projectName, TEMP_DIR);

    const dummyFilePath = path.join(TEMP_DIR, "dummy.txt");
    fs.writeFileSync(dummyFilePath, "Hello Vitest!");

    const importedPath = importResource(dummyFilePath, projectPath);

    expect(fs.existsSync(importedPath)).toBe(true);
    expect(fs.readFileSync(importedPath, "utf-8")).toBe("Hello Vitest!");
  });

  it("imports a folder into the project", () => {
    const projectName = "ImportFolderProject";
    const projectPath = createProject(projectName, TEMP_DIR);

    const dummyFolderPath = path.join(TEMP_DIR, "dummy_folder");
    fs.mkdirpSync(dummyFolderPath);
    fs.writeFileSync(path.join(dummyFolderPath, "file.txt"), "Nested File");

    const importedFolderPath = importResource(dummyFolderPath, projectPath);

    expect(fs.existsSync(importedFolderPath)).toBe(true);
    expect(fs.existsSync(path.join(importedFolderPath, "file.txt"))).toBe(true);
  });
});
