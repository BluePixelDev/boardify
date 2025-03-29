import "./contextmenu.styles.css";
import { DropdownItem } from "@/features/app/dropdown";
import { MenuContextItem } from "./types/menuContext";

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuContextItem[];
  onClose: () => void;
}

// Recursive function to render menu items
function renderItems(items: MenuContextItem[], parentPath: string = '') {
  return items.map((item) => {
    const currentPath = parentPath ? `${parentPath}/${item.path}` : item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <DropdownItem
        key={currentPath}
        label={item.label}
        onClick={item.action}
        expandOnHover={hasChildren}
        className="context-menu-dropdown__item"
      >
        {item.children && item.children.length > 0 && renderItems(item.children, currentPath)}
      </DropdownItem>
    );
  });
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, x, y }) => {
  return (
    <div
      style={{ top: y, left: x }}
      className="context-menu-dropdown__container"
    >
      {renderItems(items)}
    </div>
  );
};

export default ContextMenu;
