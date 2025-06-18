import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import "./modal.styles.css";

interface ModalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  containerClass?: string;
  onClose?: () => void;
  isOpen: boolean;
}

export const Modal = ({
  children,
  className,
  containerClass,
  onClose,
  title,
  isOpen,
}: ModalWindowProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className={classNames("modal-container", containerClass)}
      onClose={() => onClose}
    >
      {/* Backdrop Transition */}
      <TransitionChild
        as={Fragment}
        enter="transition-opacity duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="modal-dim fixed inset-0" />
      </TransitionChild>

      {/* Modal Content Transition */}
      <div className="fixed inset-0 flex items-center justify-center">
        <TransitionChild
          as={Fragment}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 scale-95 translate-y-4"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-4"
        >
          <DialogPanel className={classNames("modal", className)}>
            <div className="modal__header">
              {title && (
                <DialogTitle as="h2" className="modal__title">
                  {title}
                </DialogTitle>
              )}
              {onClose && (
                <button
                  className="modal__close-button"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <Icon icon="ic:round-close" className="modal__close-icon" />
                </button>
              )}
            </div>
            {children}
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </Transition>
);
