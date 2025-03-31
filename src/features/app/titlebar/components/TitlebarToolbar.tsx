import { DropdownItem } from "@/features/app/dropdown"
import { useToolbar } from "../context/ToolbarProvider"
import { ToolbarItem } from "../types/toolbar"

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

function renderToolbarItems(items: Record<string, any>, parentPath: string = '') {
    return Object.keys(items).map((key) => {
        const currentPath = parentPath ? `${parentPath}/${key}` : key
        const subItems = items[key]
        const onClick = Array.isArray(subItems) ? subItems[0].action : undefined

        return (
            <DropdownItem
                key={currentPath}
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
