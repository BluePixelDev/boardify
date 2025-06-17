import { importFile } from "@/services/importer/importAction";
import { useAppDispatch } from "@/redux";
import { ModalContainer } from "@/ui/modal";
import { basename } from "@tauri-apps/api/path";
import { DragDropEvent, getCurrentWebview } from "@tauri-apps/api/webview";
import { readFile } from "@tauri-apps/plugin-fs";
import { error } from "@tauri-apps/plugin-log";
import { useEffect, useRef, useState } from "react";
import "./fildedrop.styles.css";
import FileDropModal from "./FileDropModal";

export function FileDropzone(): JSX.Element {
  const [draggingFiles, setDraggingFiles] = useState(false);
  const dispatch = useAppDispatch();
  const internalDrag = useRef(false);

  const handleInternalDragStart = () => (internalDrag.current = true);
  const handleInternalDragEnd = () => (internalDrag.current = false);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const setupDragDrop = async () => {
      try {
        const webview = getCurrentWebview();
        const unlisten = await webview.onDragDropEvent(async (event) => {
          if (!isMounted) return;
          if (internalDrag.current) {
            setDraggingFiles(false);
            return;
          }

          const { type } = event.payload;
          switch (type) {
            case "over":
              handleDragOver();
              break;
            case "drop":
              await handleDrop(event.payload);
              break;
            default:
              await handleUnknownEvent();
              break;
          }
        });

        cleanup = unlisten;
      } catch (err) {
        await error(`Failed to setup drag and drop listener: ${err}`);
      }
    };

    window.addEventListener("dragstart", handleInternalDragStart);
    window.addEventListener("dragend", handleInternalDragEnd);
    window.addEventListener("mouseup", handleInternalDragEnd);
    setupDragDrop();

    return () => {
      isMounted = false;
      if (cleanup) cleanup();
      window.removeEventListener("dragstart", handleInternalDragStart);
      window.removeEventListener("dragend", handleInternalDragEnd);
      window.removeEventListener("mouseup", handleInternalDragEnd);
    };
  }, []);

  const handleDragOver = () => {
    setDraggingFiles(true);
  };

  const handleDrop = async (
    payload: Extract<DragDropEvent, { type: "drop" }>
  ) => {
    setDraggingFiles(false);

    const { paths, position } = payload;
    if (!paths?.length) {
      await error("No file paths available on drop event.");
      return;
    }

    for (const path of paths) {
      const fileData = await readFile(path);
      const fileName = await basename(path);
      const file = new File([fileData], fileName);
      const positionXY = { x: position.x, y: position.y };
      dispatch(importFile(path, positionXY, file));
    }
  };

  const handleUnknownEvent = async () => {
    setDraggingFiles(false);
  };

  return (
    <ModalContainer show={draggingFiles} className="file-drop-modal__container">
      <FileDropModal />
    </ModalContainer>
  );
}

export default FileDropzone;
