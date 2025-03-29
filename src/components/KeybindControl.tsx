import { toggleSidebar } from "@/redux/app/appSlice"
import { getAllSelectedNodes } from "@/redux/nodes/nodeSelector"
import { deselectAllNodes, removeNode, selectAllNodes, updateNode } from "@/redux/nodes/nodesSlice"
import { getAllKeybinds } from "@/redux/settings/settingsSelector"
import { KeyAction } from "@/redux/settings/settingsSlice"
import { RootState } from "@/redux/store"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const KeybindControl = () => {
    const dispatch = useDispatch()
    const selectedNodes = useSelector((state: RootState) => getAllSelectedNodes(state))
    const keybinds = useSelector((state: RootState) => getAllKeybinds(state))

    const movementAmount = 10
    const movementLargeMultiplier = 5

    const matchesKeybind = useCallback((event: KeyboardEvent, keybind: any): boolean => {
        if (event.key !== keybind.key) return false

        if (keybind.ctrl !== undefined && event.ctrlKey !== keybind.ctrl) return false
        if (keybind.shift !== undefined && event.shiftKey !== keybind.shift) return false
        if (keybind.alt !== undefined && event.altKey !== keybind.alt) return false
        if (keybind.meta !== undefined && event.metaKey !== keybind.meta) return false

        return true
    }, [])

    const findMatchingAction = useCallback((event: KeyboardEvent): string | null => {
        for (const [actionKey, keybind] of Object.entries(keybinds)) {
            if (matchesKeybind(event, keybind)) {
                return actionKey
            }
        }
        return null
    }, [keybinds, matchesKeybind])

    /**
   * Handle all keyboard shortcuts
   */
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Skip if we're in an input field or textarea
        const target = event.target as HTMLElement
        if (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable
        ) {
            return
        }

        const matchingAction = findMatchingAction(event)
        if (!matchingAction) return

        // Prevent default browser behavior for our shortcuts
        event.preventDefault()

        // Execute the appropriate action based on the matched keybind
        switch (matchingAction) {
            case KeyAction.SELECT_ALL:
                dispatch(selectAllNodes())
                break

            case KeyAction.DESELECT_ALL:
                dispatch(deselectAllNodes())
                break

            case KeyAction.DELETE_SELECTED:
                selectedNodes.forEach(x => {
                    dispatch(removeNode(x.id))
                })
                break

            case KeyAction.MOVE_LEFT:
                moveSelectedNodes(-movementAmount, 0)
                break

            case KeyAction.MOVE_RIGHT:
                moveSelectedNodes(movementAmount, 0)
                break

            case KeyAction.MOVE_UP:
                moveSelectedNodes(0, -movementAmount)
                break

            case KeyAction.MOVE_DOWN:
                moveSelectedNodes(0, movementAmount)
                break

            case KeyAction.MOVE_LEFT_LARGE:
                moveSelectedNodes(-movementAmount * movementLargeMultiplier, 0)
                break

            case KeyAction.MOVE_RIGHT_LARGE:
                moveSelectedNodes(movementAmount * movementLargeMultiplier, 0)
                break

            case KeyAction.MOVE_UP_LARGE:
                moveSelectedNodes(0, -movementAmount * movementLargeMultiplier)
                break

            case KeyAction.MOVE_DOWN_LARGE:
                moveSelectedNodes(0, movementAmount * movementLargeMultiplier)
                break

            case KeyAction.TOGGLE_SIDEBAR:
                dispatch(toggleSidebar())
                break
        }
    }, [dispatch, findMatchingAction, movementAmount, movementLargeMultiplier, selectedNodes])

    /**
     * Move the selected nodes by the specified delta
     */
    const moveSelectedNodes = useCallback((dx: number, dy: number) => {
        selectedNodes.forEach(node => {
            if (node) {
                dispatch(updateNode({
                    ...node,
                    position: {
                        x: (node.position?.x || 0) + dx,
                        y: (node.position?.y || 0) + dy
                    }
                }))
            }
        })
    }, [dispatch, selectedNodes])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])
    return null
}

export default KeybindControl