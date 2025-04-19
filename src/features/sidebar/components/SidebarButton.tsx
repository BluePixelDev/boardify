import { Icon } from "@iconify/react/dist/iconify.js"
import "./sidebar.styles.css"

interface SidebarItemProps {
    icon?: string
    label: string
    selected: boolean
    onClick?: () => void
}

export default function SidebarButton({ onClick, label, selected, icon }: SidebarItemProps) {
    return (
        <button
            className={`sidebar-button ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {icon && <Icon icon={icon} className="sidebar-icon" />}

            {label}
        </button>
    )
}
