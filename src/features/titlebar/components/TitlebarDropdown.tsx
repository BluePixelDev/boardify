import { useSelector } from "react-redux";
import { DropdownItem } from "@/features/dropdown";
import { ToolbarItem } from "@/redux/appSlice";
import { selectToolbarItems } from "@/redux/appSelector";

// Group items by their path to create nested structure
function groupItemsByPath(items: ToolbarItem[]) {
    const groupedItems: Record<string, any> = {};

    items.forEach(item => {
        const pathParts = item.path.split('/');
        let currentGroup = groupedItems;

        pathParts.forEach((part, index) => {
            if (index === pathParts.length - 1) {
                if (!currentGroup[part]) {
                    currentGroup[part] = [];
                }
                currentGroup[part].push(item);
            } else {
                if (!currentGroup[part]) {
                    currentGroup[part] = {};
                }
                currentGroup = currentGroup[part];
            }
        });
    });

    return groupedItems;
}

// Render toolbar items recursively with nested dropdowns
function renderToolbarItems(items: Record<string, any>, parentPath: string = '') {
    return Object.keys(items).map((key) => {
        const currentPath = parentPath ? `${parentPath}/${key}` : key;
        const subItems = items[key];

        return (
            <DropdownItem
                key={currentPath}
                label={key}
                onClick={Array.isArray(subItems) ? subItems[0].action : undefined}
            >
                {Array.isArray(subItems) ? null : renderToolbarItems(subItems, currentPath)} {/* Recursively render nested items */}
            </DropdownItem>
        );
    });
}

export default function TitlebarDropdown() {
    const toolbarItems = useSelector(selectToolbarItems);
    const groupedItems = groupItemsByPath(toolbarItems);

    return (
        <div className="titlebar-dropdown__container">
            {renderToolbarItems(groupedItems)} {/* Render the grouped items */}
        </div>
    );
}
