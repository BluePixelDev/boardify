import { Icon } from "@iconify/react/dist/iconify.js"
import "./modal.styles.css"

interface ModalWindowProps {
    children: React.ReactNode
    className?: string
    onClose?: () => void
}

export const Modal = ({ children, className, onClose }: ModalWindowProps) => {
    return (
        <div className={`modal ${className}`}>
            {onClose &&
                <button className="modal__close-button" onClick={onClose}>
                    <Icon icon="ic:round-close" className="modal__close-icon" />
                </button>
            }
            {children}
        </div>
    )
}