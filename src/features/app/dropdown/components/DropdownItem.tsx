import "../dropdown.styles.css"
import React, { useState, useRef, useEffect } from "react";

interface DropdownItemProps {
    label: string;
    hoverDelay?: number;
    expandOnHover?: boolean;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function DropdownItem({
    label,
    hoverDelay,
    expandOnHover = false,
    className,
    onClick,
    children
}: DropdownItemProps) {

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
                setIsSubmenuOpen(false);
            }
        }
        if (expandOnHover) {
            document.addEventListener("mousemove", handleGlobalMouseMove);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousemove", handleGlobalMouseMove);
        }
    }, [expandOnHover]);

    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
            const dropdownItems = document.querySelectorAll('.dropdown__item');
            let isOverAnotherItem = false;
            dropdownItems.forEach(item => {
                if (item !== itemRef.current && item.contains(e.target as Node)) {
                    isOverAnotherItem = true;
                }
            });
            if (isOverAnotherItem) {
                setIsSubmenuOpen(false);
            }
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(children)
        if (!children) {
            onClick?.();
            return;
        }
        setIsSubmenuOpen(!isSubmenuOpen);
    }

    const handleMouseEnter = () => {
        if (expandOnHover) {
            hoverTimeout.current = setTimeout(() => {
                setIsSubmenuOpen(true);
            }, hoverDelay ?? 300);
        }
    }

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
    }

    return (
        <div
            className={`dropdown__item ${className ?? ""}`}
            ref={itemRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="dropdown__item-content">
                <span>{label}</span>
            </div>
            {children && isSubmenuOpen && (
                <div className="dropdown__submenu">{children}</div>
            )}
        </div>
    );
}
