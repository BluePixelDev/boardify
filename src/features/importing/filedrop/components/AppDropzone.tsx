import "../fildedropStyles.css"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

import FileDropDialog from "./FileDropDialog"
import { importerRegistry } from "@/features/importer/ImporterRegistry"

import { getCurrentWebview } from "@tauri-apps/api/webview"
import { readFile } from "@tauri-apps/plugin-fs"
import { info, error } from "@tauri-apps/plugin-log"

export default function DragDropHandler(): JSX.Element {
    const [draggingFiles, setDraggingFiles] = useState(false)
    const dispatch = useDispatch()
    const internalDrag = useRef(false)

    useEffect(() => {
        const markInternalDragStart = () => {
            internalDrag.current = true
        }
        const clearInternalDrag = () => {
            internalDrag.current = false
        }
        window.addEventListener("dragstart", markInternalDragStart)
        window.addEventListener("dragend", clearInternalDrag)
        window.addEventListener("mouseup", clearInternalDrag)

        let unlisten: (() => void) | undefined

        const setupDragDropListener = async () => {
            try {
                const webview = getCurrentWebview()
                unlisten = await webview.onDragDropEvent(async (event) => {
                    if (internalDrag.current) {
                        setDraggingFiles(false)
                        return
                    }
                    const { type } = event.payload

                    if (type === "over") {
                        setDraggingFiles(true)
                    } else if (type === "drop") {
                        setDraggingFiles(false)
                        const paths = event.payload.paths

                        if (paths?.length) {
                            for (const path of paths) {
                                const fileName = path.split(/[\\/]/).pop() || ""
                                const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""
                                const importer = importerRegistry.getImporterForFormat(fileExtension)

                                if (importer) {
                                    try {
                                        const fileData = await readFile(path)
                                        const file = new File([fileData], fileName)
                                        importer.importData(file, dispatch)
                                        await info(`File ${fileName} imported successfully.`)
                                    } catch (err) {
                                        await error(`Failed to import ${fileName}: ${err}`)
                                    }
                                } else {
                                    await error(`No importer found for file type: ${fileExtension}`)
                                }
                            }
                        } else {
                            await error("No file paths available on drop event.")
                        }
                    } else {
                        setDraggingFiles(false)
                        await info(`Drag drop event of type '${type}' was not handled.`)
                    }
                })
            } catch (err) {
                await error(`Failed to setup drag and drop listener: ${err}`)
            }
        }

        setupDragDropListener()

        return () => {
            if (unlisten) unlisten()
            window.removeEventListener("dragstart", markInternalDragStart)
            window.removeEventListener("dragend", clearInternalDrag)
            window.removeEventListener("mouseup", clearInternalDrag)
        }
    }, [dispatch])

    return (
        <div className={`app-dropzone ${draggingFiles ? "dragging" : ""}`}>
            {draggingFiles && <FileDropDialog />}
        </div>
    )
}