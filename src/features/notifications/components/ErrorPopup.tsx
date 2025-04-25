import './errorPopup.styles.css';

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
}

const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => {
    return (
        <div className="error-popup__overlay">
            <div className="error-popup__box">
                <button className="error-popup__close" onClick={onClose} aria-label="Close popup">
                    &times;
                </button>
                <h2 className="error-popup__title">Something went wrong</h2>
                <p className="error-popup__message">{message}</p>
                <button className="error-popup__button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
