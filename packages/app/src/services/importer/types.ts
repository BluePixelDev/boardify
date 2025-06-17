export class NoSuitableImporterError extends Error {
  constructor(fileType: string, fileName: string) {
    super(`No importer found for file type: ${fileType} (${fileName})`);
    this.name = "NoSuitableImporterError";
  }
}
