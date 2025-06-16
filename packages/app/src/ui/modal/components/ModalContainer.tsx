import "./modal.styles.css";

interface ModalContainerProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
}

export const ModalContainer = ({
  children,
  className,
  show = false,
}: ModalContainerProps) => {
  return (
    <>
      {show && <div className={`modal-container ${className}`}>{children}</div>}
    </>
  );
};
