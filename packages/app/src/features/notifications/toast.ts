import { toast, ToastOptions, ToastPosition } from "react-toastify";

/**
 * Base configuration for toasts. Can be overridden per-toast.
 */
const defaultOptions: ToastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * Display a success toast.
 * @param message The message to display.
 * @param options Optional toast customization.
 */
export const showSuccessToast = (message: string, options?: ToastOptions) =>
  toast.success(message, {
    ...defaultOptions,
    className: "toast-success",
    ...options,
  });

/**
 * Display an error toast.
 * @param message The message to display.
 * @param options Optional toast customization.
 */
export const showErrorToast = (message: string, options?: ToastOptions) =>
  toast.error(message, {
    ...defaultOptions,
    className: "toast-error",
    ...options,
  });

/**
 * Display an informational toast.
 * @param message The message to display.
 * @param options Optional toast customization.
 */
export const showInfoToast = (message: string, options?: ToastOptions) =>
  toast.info(message, {
    ...defaultOptions,
    className: "toast-info",
    ...options,
  });

/**
 * Display a warning toast.
 * @param message The message to display.
 * @param options Optional toast customization.
 */
export const showWarningToast = (message: string, options?: ToastOptions) =>
  toast.warn(message, {
    ...defaultOptions,
    className: "toast-warning",
    ...options,
  });
