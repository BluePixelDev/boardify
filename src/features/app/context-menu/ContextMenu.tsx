import "./contextmenu.styles.css"
import { DropdownItem } from "@/features/app/dropdown";
import { MenuContextItem } from "./types/menuContext";
import { ToolbarItem } from "../titlebar/types/toolbar";

interface ContextMenuProps {
    x: number;
    y: number;
    items: MenuContextItem[];
    onClose: () => void;
}

function groupItemsByPath(items: ToolbarItem[]) {
    return items.reduce((acc, item) => {
        const pathParts = item.path.split('/')
        let currentGroup = acc

        pathParts.forEach((part, index) => {
            if (index === pathParts.length - 1) {
                if (!currentGroup[part]) currentGroup[part] = []
                currentGroup[part].push(item)
            } else {
                if (!currentGroup[part]) currentGroup[part] = {}
                currentGroup = currentGroup[part]
            }
        })

        return acc
    }, {} as Record<string, any>)
}

// Render toolbar items recursively with nested dropdowns
function renderItems(items: Record<string, any>, parentPath: string = '') {
    return Object.keys(items).map((key) => {
        const currentPath = parentPath ? `${parentPath}/${key}` : key;
        const subItems = items[key];
        const onClick = Array.isArray(subItems) ? subItems[0].action : undefined;

        return (
            <DropdownItem
                key={currentPath}
                label={key}
                onClick={onClick}
                expandOnHover={true}
                className="context-menu-dropdown__item"
            >
               {Array.isArray(subItems) ? null : renderItems(subItems, currentPath)}
            </DropdownItem>
        );
    });
}


export const ContextMenu: React.FC<ContextMenuProps> = ({ items, x, y }) => {
    const groupedItems = groupItemsByPath(items);
    return (
        <div
            style={{ top: y, left: x }}
            className="context-menu-dropdown__container"
        >
            {renderItems(groupedItems)}
        </div>
    );
};
