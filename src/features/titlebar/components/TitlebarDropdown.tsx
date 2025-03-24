import { useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "@/features/dropdown";
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

        if (Array.isArray(subItems)) {
            return subItems.map((item) => (
                <DropdownItem
                    key={item.path}
                    label={key}
                    onClick={item.action}
                />
            ));
        }

        return (
            <Dropdown key={currentPath} label={key}>
                {renderToolbarItems(subItems, currentPath)} {/* Recursively render nested items */}
            </Dropdown>
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
