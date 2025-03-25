import React, { createContext, useContext, useState, useEffect } from "react"
import { ContextMenu } from "./ContextMenu"
import { MenuContextItem } from "./types/menuContext"

interface ContextMenuType {
    element: HTMLElement | null
    x: number
    y: number
    items: MenuContextItem[]
    openMenu: (event: React.MouseEvent, items: MenuContextItem[]) => void
    closeMenu: () => void
}

const ContextMenuContext = createContext<ContextMenuType | undefined>(undefined)

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext)
    if (!context) throw new Error("useContextMenu must be used within a ContextMenuProvider")
    return context
}

export const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const [element, setElement] = useState<HTMLElement | null>(null)
    const [menuItems, setMenuItems] = useState<MenuContextItem[]>([])
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        const handleContextMenu = (event: React.MouseEvent) => {
            openMenu(event, [])
        }

        document.addEventListener("contextmenu", handleContextMenu as unknown as EventListener)
        return () => document.removeEventListener("contextmenu", handleContextMenu as unknown as EventListener)
    }, [element])

    const openMenu = (event: React.MouseEvent, items: MenuContextItem[]) => {
        event.preventDefault()
        setIsContextMenuOpen(true)
        setX(event.clientX)
        setY(event.clientY)
        setMenuItems(items)
        setElement(event.currentTarget as HTMLElement)
    }

    const closeMenu = () => {
        setIsContextMenuOpen(false)
        setElement(null)
        setMenuItems([])
    }

    return (
        <ContextMenuContext.Provider value={{ element, x, y, items: menuItems, openMenu, closeMenu }}>
            {isContextMenuOpen &&
                <ContextMenu x={x} y={y} items={[
                    { path: "File/New", action: () => console.log("New file") },
                    { path: "File/JOe", action: () => console.log("New file") },
                ]} onClose={closeMenu} />
            }
            {children}
        </ContextMenuContext.Provider>
    )
}