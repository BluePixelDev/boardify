import "./contextmenu.styles.css";
import { DropdownItem } from "@/ui/dropdown";
import { MenuContextItem } from "./types";

interface ContextMenuProps {
  x: number;
  y: number;
  items: MenuContextItem[];
  onClose: () => void;
}

function renderItems(items: MenuContextItem[], parentPath: string = "") {
  return items.map((item) => {
    const currentPath = parentPath ? `${parentPath}/${item.path}` : item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <DropdownItem
        key={currentPath}
        label={item.label}
        onClick={item.action}
        expandOnHover={hasChildren}
      >
        {item.children &&
          item.children.length > 0 &&
          renderItems(item.children, currentPath)}
      </DropdownItem>
    );
  });
}

export const ContextMenu = ({ items, x, y }: ContextMenuProps) => {
  return (
    <div style={{ top: y, left: x }} className="context-menu">
      {renderItems(items)}
    </div>
  );
};

export default ContextMenu;
