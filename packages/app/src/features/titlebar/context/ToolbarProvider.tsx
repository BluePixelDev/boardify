import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToolbarItem } from "../types";

interface ToolbarContextProps {
  items: ToolbarItem[];
  addItem: (item: ToolbarItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const ToolbarContext = createContext<ToolbarContextProps | undefined>(
  undefined
);

export const ToolbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<ToolbarItem[]>([
    { path: "File/Save", action: () => alert("Save clicked!") },
    { path: "File/Save As", action: () => alert("Save As clicked!") },
    { path: "File/Open", action: () => alert("Open clicked!") },
    { path: "Debug/ Alert", action: () => alert("Debug Alert clicked!") },
    {
      path: "File/Preferences/Settings",
      action: () => alert("Settings clicked!"),
    },
  ]);

  const addItem = (item: ToolbarItem) => {
    setItems((prevItems) => {
      if (prevItems.some((existingItem) => existingItem.path === item.path)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.path !== id));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <ToolbarContext.Provider value={{ items, addItem, removeItem, clearItems }}>
      {children}
    </ToolbarContext.Provider>
  );
};

export const useToolbar = (): ToolbarContextProps => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
};
