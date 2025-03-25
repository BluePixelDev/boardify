import "../titlebar.styles.css";
import React from "react";

export type ToolbarButtonProps = {
    label?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

export default function ToolbarButton({
    label,
    children,
    className,
    onClick,
}: ToolbarButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`titlebar__button ${className ?? ""}`}
            aria-label={label}
        >
            {children ? children : label && <span>{label}</span>}
        </button>
    );
}
