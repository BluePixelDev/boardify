import { DropdownItem } from "@/features/app/dropdown"
import { useToolbar } from "../context/ToolbarProvider"
import { ToolbarItem } from "../types"

interface GroupedItems {
    [key: string]: GroupedItems | ToolbarItem[]
}

function groupItemsByPath(items: ToolbarItem[]): GroupedItems {
    return items.reduce((acc: GroupedItems, item) => {
        const pathParts = item.path.split('/')
        pathParts.reduce((currentGroup, part, index) => {
            if (index === pathParts.length - 1) {
                if (!Array.isArray(currentGroup[part])) {
                    currentGroup[part] = []
                }
                (currentGroup[part] as ToolbarItem[]).push(item)
            } else {
                if (!currentGroup[part] || Array.isArray(currentGroup[part])) {
                    currentGroup[part] = {}
                }
            }
            return currentGroup[part] as GroupedItems
        }, acc)
        return acc
    }, {} as GroupedItems)
}

function renderToolbarItems(items: GroupedItems, parentPath = '') {
    return Object.keys(items).map((key) => {
        const currentPath = parentPath ? `${parentPath}/${key}` : key
        const subItems = items[key]
        const onClick = Array.isArray(subItems) ? subItems[0].action : undefined

        return (
            <DropdownItem
                key={currentPath}
                topLevel={parentPath === ''}
                label={key}
                onClick={onClick}
                expandOnHover={true}
                className="titlebar-dropdown__item"
            >
                {Array.isArray(subItems) ? null : renderToolbarItems(subItems, currentPath)}
            </DropdownItem>
        )
    })
}

export default function TitlebarToolbar() {
    const { items } = useToolbar()
    const groupedItems = groupItemsByPath(items)

    return (
        <div className="titlebar-dropdown__container">
            {renderToolbarItems(groupedItems)} {/* Render the grouped items */}
        </div>
    )
}
