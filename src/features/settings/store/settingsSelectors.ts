import { RootState } from "@/store";

export function isSettingsModalOpen(state: RootState) {
    return state.settings.isSettingsModalOpen;
}