export type KeyModifiers = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
};

export type Keybind = KeyModifiers & {
  key: string;
  action: string;
};

export enum KeyAction {
  SELECT_ALL = "selectAll",
  DESELECT_ALL = "deselectAll",
  DELETE_SELECTED = "deleteSelected",
  MOVE_LEFT = "moveLeft",
  MOVE_RIGHT = "moveRight",
  MOVE_UP = "moveUp",
  MOVE_DOWN = "moveDown",
  MOVE_LEFT_LARGE = "moveLeftLarge",
  MOVE_RIGHT_LARGE = "moveRightLarge",
  MOVE_UP_LARGE = "moveUpLarge",
  MOVE_DOWN_LARGE = "moveDownLarge",
  TOGGLE_SIDEBAR = "toggleSidebar",
}
