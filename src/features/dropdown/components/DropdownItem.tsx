import React, { useState, useRef, useEffect } from "react";

interface DropdownItemProps {
    label: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function DropdownItem({ label, onClick, children }: DropdownItemProps) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
                setIsSubmenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!children) {
            onClick?.()
            return
        }
        setIsSubmenuOpen(!isSubmenuOpen);
    }

    return (
        <div className="dropdown-item" ref={itemRef} onClick={handleClick}>
            <div className="dropdown-item-content">
                <span>{label}</span>
                {children && (
                    <button className="dropdown-submenu-toggle">
                        {isSubmenuOpen ? "▶" : "▲"}
                    </button>
                )}
            </div>
            {children && isSubmenuOpen && (
                <div className="dropdown-submenu">{children}</div>
            )}
        </div>
    );
}
