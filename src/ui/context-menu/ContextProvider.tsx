import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContextMenuEvent, ContextMenuHandler, MenuContextItem } from "./types";
import ContextMenu from "./ContextMenu";

interface ContextMenuContextProps {
  registerHandler: (handler: ContextMenuHandler) => () => void;
  unregisterHandler: (handler: ContextMenuHandler) => void;
}

const ContextMenuContext = createContext<ContextMenuContextProps | undefined>(
  undefined
);

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenuProvider");
  }
  return context;
};

export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [handlers, setHandlers] = useState<ContextMenuHandler[]>([]);
  const [menuState, setMenuState] = useState<{
    isVisible: boolean;
    x: number;
    y: number;
    items: MenuContextItem[];
  }>({
    isVisible: false,
    x: 0,
    y: 0,
    items: [],
  });

  const handlersRef = useRef<ContextMenuHandler[]>(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const unregisterHandler = useCallback((handler: ContextMenuHandler) => {
    setHandlers((prev) => prev.filter((h) => h !== handler));
  }, []);

  const registerHandler = useCallback(
    (handler: ContextMenuHandler) => {
      setHandlers((prev) => {
        return [...prev, handler];
      });

      return () => {
        unregisterHandler(handler);
      };
    },
    [unregisterHandler]
  );

  const hideMenu = useCallback(() => {
    setMenuState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      if (handlersRef.current.length === 0) return;

      const target = e.target as HTMLElement;
      if (!target) return;

      const event: ContextMenuEvent = {
        element: target,
        nativeEvent: e as unknown as React.MouseEvent,
        menuItems: [],
      };

      handlersRef.current.forEach((handler) => {
        handler(event);
      });

      const sortedItems = [...event.menuItems].sort((a, b) => {
        const orderA = a.order ?? 100;
        const orderB = b.order ?? 100;
        return orderA - orderB;
      });

      if (sortedItems.length > 0) {
        setMenuState({
          isVisible: true,
          x: e.clientX,
          y: e.clientY,
          items: sortedItems,
        });
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handlers, menuState]);

  const contextValue = {
    registerHandler,
    unregisterHandler,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
      {menuState.isVisible && (
        <ContextMenu
          x={menuState.x}
          y={menuState.y}
          items={menuState.items}
          onClose={hideMenu}
        />
      )}
    </ContextMenuContext.Provider>
  );
};
