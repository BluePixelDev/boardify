import "../fildedropStyles.css"
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileDropDialog from "./FileDropDialog";

export default function () {
    const [draggingFiles, setDraggingFiles] = useState(false);

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

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
        setDraggingFiles(false);
    }, []);

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
