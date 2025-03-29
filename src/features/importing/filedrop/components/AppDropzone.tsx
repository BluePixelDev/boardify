import "../fildedrop.styles.css"
import { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import FileDropDialog from "./FileDropDialog";
import { importerRegistry } from "@/features/importing/ImporterRegistry";
import { useDispatch } from "react-redux";
import { ImportEvent } from "@/features/importing";

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

    const onDrop = useCallback((acceptedFiles: File[], _fileRejections: FileRejection[], event: DropEvent) => {
        acceptedFiles.forEach((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            const importer = importerRegistry.getImporterForFormat(fileExtension || "");
            if (importer) {
                const dragEvent = event as DragEvent;
                const importEvent: ImportEvent = {
                    file,
                    dispatch,
                    position: { x: dragEvent.clientX || 100, y: dragEvent.clientY || 100 }
                };
                
                importer.importData(importEvent);
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
