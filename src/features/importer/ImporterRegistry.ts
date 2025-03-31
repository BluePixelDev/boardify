import { IImporter } from "./IImporter"

class ImporterRegistry {
    private importers: IImporter[] = []

    registerImporter(importer: IImporter) {
        this.importers.push(importer);
    }

    getImporterForFormat(format: string) {
        return this.importers.find((importer) =>
            importer.getSupportedFormats().includes(format)
        );
    }
}

export const importerRegistry = new ImporterRegistry();
