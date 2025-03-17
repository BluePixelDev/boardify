import { Icon } from "@iconify/react/dist/iconify.js"

interface SidebarItemProps {
    icon?: string
    label: string
    selected: boolean
    onClick?: () => void
}

export default function SidebarItem({ onClick, label, selected, icon }: SidebarItemProps) {
    return (
        <button
            className={`sidebar-item ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {icon && <Icon icon={icon} className="sidebar-icon" />}
            
            {label}
        </button>
    )
}
