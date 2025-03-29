import { RootState } from "../store"

export const isSidebarOpen = (state: RootState): boolean => {
    return state.app.openSidebar
}