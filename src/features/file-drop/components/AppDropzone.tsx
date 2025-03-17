import "../fildedropStyles.css"
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileDropDialog from "./FileDropDialog";
import { importerRegistry } from "@/features/importer/ImporterRegistry";
import { useDispatch } from "react-redux";

export default function () {
    const [draggingFiles, setDraggingFiles] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        addEventListener("dragenter", handleDragEnter)

        return () => {
            removeEventListener("dragenter", handleDragEnter)
        }
    })

    const handleDragEnter = (event: DragEvent) => {
        if (event.dataTransfer?.items) {
            setDraggingFiles(true);
        }
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Get file extension (e.g., csv, json)

            // Check if there's an importer available for this file type
            const importer = importerRegistry.getImporterForFormat(fileExtension || "");

            if (importer) {
                // If importer exists for the file type, use it to process the file
                importer.importData(file, dispatch);
                console.log(`File ${file.name} imported successfully.`);
            } else {
                console.error(`No importer found for file type: ${fileExtension}`);
            }
        });
        setDraggingFiles(false);
    }, [dispatch]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        noDragEventsBubbling: false,
        onDragLeave: () => {
            setDraggingFiles(false)
        }
    });


    return (
        <div
            className={`app-dropzone ${draggingFiles ? 'dragging' : ''}`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {draggingFiles &&
                <FileDropDialog></FileDropDialog>
            }
        </div>
    );
}
