import { Icon } from "@iconify/react/dist/iconify.js";
import "./modal.styles.css";

interface ModalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose?: () => void;
}

export const Modal = ({
  children,
  className,
  onClose,
  title,
}: ModalWindowProps) => {
  return (
    <div className={`modal ${className}`}>
      <div className="modal__header">
        {title && <h2 className="modal__title">{title}</h2>}
        {onClose && (
          <div className="modal__close-button" onClick={onClose}>
            <Icon icon="ic:round-close" className="modal__close-icon" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
