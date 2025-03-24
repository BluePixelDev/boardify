import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToolbarItem {
    path: string;
    action: () => void;
}

interface ContextMenuItem {
    path: string;
    action: (context: any) => void;
}

interface AppState {
    openSidebar: boolean
    toolbarItems: ToolbarItem[];
    contextMenuItems: Record<string, ContextMenuItem[]>;
}

const initialState: AppState = {
    openSidebar: false,
    toolbarItems: [
        { path: 'File/Save', action: () => alert('Save clicked!') },
        { path: 'File/Save As', action: () => alert('Save As clicked!') },
        { path: 'File/Open', action: () => alert('Open clicked!') },
        { path: 'Debug/ Alert', action: () => alert('Debug Alert clicked!') },
        { path: 'File/Preferences/Settings', action: () => alert('Settings clicked!') }
    ],
    contextMenuItems: {}
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.openSidebar = !state.openSidebar
        },

        // ==== TOOLBAR ITEM ====
        addToolbarItem: (state, action: PayloadAction<ToolbarItem>) => {
            state.toolbarItems.push(action.payload);
        },
        removeToolbarItem: (state, action: PayloadAction<string>) => {
            state.toolbarItems = state.toolbarItems.filter(item => item.path !== action.payload);
        },

        // ==== CONTEXT MENU ====
        addContextMenuItem: (state, action: PayloadAction<{ key: string, item: ContextMenuItem }>) => {
            const { key, item } = action.payload;
            if (!state.contextMenuItems[key]) {
                state.contextMenuItems[key] = [];
            }
            state.contextMenuItems[key].push(item);
        },
        removeContextMenuItem: (state, action: PayloadAction<{ key: string, itemId: string }>) => {
            const { key, itemId } = action.payload;
            if (state.contextMenuItems[key]) {
                state.contextMenuItems[key] = state.contextMenuItems[key].filter(item => item.path !== itemId);
            }
        }
    }
})

export type { AppState };
export const { toggleSidebar, addToolbarItem, removeToolbarItem, addContextMenuItem, removeContextMenuItem } = appSlice.actions;
export default appSlice.reducer;

