import "../dropdown.styles.css"
import React, { useState, useRef, useEffect } from "react"

interface DropdownItemProps {
    label: string,
    topLevel?: boolean
    hoverDelay?: number
    expandOnHover?: boolean
    className?: string
    shardClassName?: string
    style?: React.CSSProperties
    onClick?: () => void
    children?: React.ReactNode
}

/**
 * A dropdown item component that can be used to create a dropdown menu.
 * It can contain submenus and handle hover and click events.
 */
export default function DropdownItem({
    label,
    topLevel = false,
    hoverDelay,
    expandOnHover = false,
    className,
    style,
    onClick,
    children
}: DropdownItemProps) {

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const itemRef = useRef<HTMLDivElement>(null)
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
                closeSubmenu()
            }
        }
        if (expandOnHover) {
            document.addEventListener("mousemove", handleGlobalMouseMove)
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("mousemove", handleGlobalMouseMove)
        }
    }, [expandOnHover])

    const handleGlobalMouseMove = (e: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
            const dropdownItems = document.querySelectorAll('.dropdown__item')
            let isOverAnotherItem = false
            dropdownItems.forEach(item => {
                if (item !== itemRef.current && item.contains(e.target as Node)) {
                    isOverAnotherItem = true
                }
            })
            if (isOverAnotherItem) {
                closeSubmenu()
            }
        }
    }

    const closeSubmenu = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current)
        }
        setIsSubmenuOpen(false)
    }

    const handleMouseEnter = () => {
        if (expandOnHover) {
            hoverTimeout.current = setTimeout(() => {
                setIsSubmenuOpen(true)
            }, hoverDelay ?? 300)
        }
    }

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current)
        }
    }

    const handlePress = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        if (!children) {
            onClick?.()
            return
        }
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout?.current)
        }
        if (topLevel) {
            setIsSubmenuOpen(!isSubmenuOpen)
        }
        else {
            setIsSubmenuOpen(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handlePress(e)
        } else if (e.key === "Escape") {
            setIsSubmenuOpen(false)
        } else if (e.key === "ArrowDown" && children && !isSubmenuOpen) {
            setIsSubmenuOpen(true)
        }
    }

    return (
        <div
            className={['dropdown__item', className, isSubmenuOpen && "open", topLevel && "top-level"].filter(Boolean).join(" ")}
            ref={itemRef}
            onClick={handlePress}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menuitem"
            tabIndex={0}
            style={{ ...style }}
        >
            <div className="dropdown__item-content">
                <span>{label}</span>
            </div>
            {children && isSubmenuOpen && (
                <div className={'dropdown__submenu'}>
                    {children}
                </div>
            )}
        </div>
    )
}
