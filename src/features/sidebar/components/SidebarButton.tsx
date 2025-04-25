import { Icon } from "@iconify/react/dist/iconify.js";
import "./sidebar.styles.css";

interface SidebarItemProps {
  icon?: string;
  className?: string;
  children?: React.ReactNode;
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export default function SidebarButton({
  onClick,
  label,
  selected,
  icon,
  className,
  children,
}: SidebarItemProps) {
  return (
    <button
      className={`sidebar-button ${selected ? "selected" : ""} ${className ?? ""}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} className="sidebar-icon" />}
      {label}
      {children}
    </button>
  );
}
