import { RootState } from "@/redux";

export function isSettingsModalOpen(state: RootState) {
  return state.settings.isSettingsModalOpen;
}
