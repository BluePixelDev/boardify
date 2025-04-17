import { RootState } from "../../redux/store"

export const isSidebarOpen = (state: RootState): boolean => {
    return state.app.openSidebar
}