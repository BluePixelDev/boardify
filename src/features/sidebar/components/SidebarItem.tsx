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

export default function SidebarItem({
  onClick,
  label,
  selected,
  icon,
  className,
  children,
}: SidebarItemProps) {
  return (
    <div
      className={`sidebar-item ${selected ? "selected" : ""} ${className ?? ""}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} className="sidebar-icon" />}
      {label}
      {children}
    </div>
  );
}
