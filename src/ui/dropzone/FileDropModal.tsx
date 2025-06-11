import { Modal } from "@/ui/modal";
import { Icon } from "@iconify/react";
import "./fildedrop.styles.css";

export default function FileDropModal() {
  return (
    <Modal className="file-drop__modal">
      <div className="file-drop__content">
        <Icon icon="subway:file-1" className="file-drop__icon" />
        <h1 className="file-drop__title">Drop files here</h1>
      </div>
    </Modal>
  );
}
