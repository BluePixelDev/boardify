import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux";
import {
  clearAllNodeSelections,
  removeNode,
  markAllNodesSelected,
  updateNode,
} from "@/features/board/slices/nodes.slice";
import { toggleSidebar } from "@/redux/app/appSlice";
import { selectKeybinds } from "../store/keybindSelectors";
import { KeyAction, Keybind } from "../types";
import { selectSelectedNodes } from "@/features/board";

const movementAmount = 10;
const movementLargeMultiplier = 5;

export const KeybindControl = () => {
  const dispatch = useDispatch();
  const selectedNodes = useAppSelector(selectSelectedNodes);
  const keybinds = useAppSelector(selectKeybinds);

  const matchesKeybind = useCallback(
    (event: KeyboardEvent, keybind: Keybind): boolean => {
      if (event.key !== keybind.key) return false;
      if (keybind.ctrl !== undefined && event.ctrlKey !== keybind.ctrl)
        return false;
      if (keybind.shift !== undefined && event.shiftKey !== keybind.shift)
        return false;
      if (keybind.alt !== undefined && event.altKey !== keybind.alt)
        return false;
      if (keybind.meta !== undefined && event.metaKey !== keybind.meta)
        return false;
      return true;
    },
    []
  );

  const findMatchingAction = useCallback(
    (event: KeyboardEvent): string | null => {
      for (const [actionKey, keybind] of Object.entries(keybinds)) {
        if (matchesKeybind(event, keybind)) return actionKey;
      }
      return null;
    },
    [keybinds, matchesKeybind]
  );

  const moveSelectedNodes = useCallback(
    (dx: number, dy: number) => {
      selectedNodes.forEach((node) => {
        if (node) {
          dispatch(
            updateNode({
              id: node.id,
              changes: {
                position: {
                  x: (node.position?.x || 0) + dx,
                  y: (node.position?.y || 0) + dy,
                },
              },
            })
          );
        }
      });
    },
    [dispatch, selectedNodes]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        ["INPUT", "TEXTAREA"].includes(target.tagName) ||
        target.isContentEditable
      )
        return;

      const matchingAction = findMatchingAction(event);
      if (!matchingAction) return;

      event.preventDefault();

      switch (matchingAction) {
        case KeyAction.SELECT_ALL:
          dispatch(markAllNodesSelected());
          break;
        case KeyAction.DESELECT_ALL:
          dispatch(clearAllNodeSelections());
          break;
        case KeyAction.DELETE_SELECTED:
          selectedNodes.forEach((node) => {
            dispatch(removeNode(node.id));
          });
          break;
        case KeyAction.MOVE_LEFT:
          moveSelectedNodes(-movementAmount, 0);
          break;
        case KeyAction.MOVE_RIGHT:
          moveSelectedNodes(movementAmount, 0);
          break;
        case KeyAction.MOVE_UP:
          moveSelectedNodes(0, -movementAmount);
          break;
        case KeyAction.MOVE_DOWN:
          moveSelectedNodes(0, movementAmount);
          break;
        case KeyAction.MOVE_LEFT_LARGE:
          moveSelectedNodes(-movementAmount * movementLargeMultiplier, 0);
          break;
        case KeyAction.MOVE_RIGHT_LARGE:
          moveSelectedNodes(movementAmount * movementLargeMultiplier, 0);
          break;
        case KeyAction.MOVE_UP_LARGE:
          moveSelectedNodes(0, -movementAmount * movementLargeMultiplier);
          break;
        case KeyAction.MOVE_DOWN_LARGE:
          moveSelectedNodes(0, movementAmount * movementLargeMultiplier);
          break;
        case KeyAction.TOGGLE_SIDEBAR:
          dispatch(toggleSidebar());
          break;
      }
    },
    [dispatch, findMatchingAction, moveSelectedNodes, selectedNodes]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};

export default KeybindControl;
