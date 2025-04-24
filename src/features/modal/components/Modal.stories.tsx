import { Modal } from "./Modal";

export default {
    title: "Modal",
    component: Modal,
}

export const Default = () => (
    <Modal
        title="Modal Title"
        onClose={() => console.log("Modal closed")}>
        <div className="modal-content">
            <p>This is a modal window.</p>
            <p>You can put any content here.</p>
        </div>
    </Modal>
)