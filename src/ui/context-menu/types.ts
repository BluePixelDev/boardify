export interface MenuContextItem {
  label: string;
  action?: () => void;
  path: string;
  order?: number;
  children?: MenuContextItem[];
}

export interface ContextMenuEvent {
  element: HTMLElement;
  nativeEvent: React.MouseEvent;
  menuItems: MenuContextItem[];
}

export type ContextMenuHandler = (event: ContextMenuEvent) => void;
