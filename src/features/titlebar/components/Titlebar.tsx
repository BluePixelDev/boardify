import { Icon } from "@iconify/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { error } from "@tauri-apps/plugin-log";
import "./titlebar.styles.css";
import TitlebarButton from "./TitlebarButton";
import { useAppDispatch } from "@/redux";
import { openSettingsModal } from "@/features/settings";
import TitlebarToolbar from "./TitlebarToolbar";

const appWindow = getCurrentWindow();
export default function Titlebar() {
  const dispatch = useAppDispatch();

  const handleMinimize = async () => {
    try {
      await appWindow.minimize();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      await error(`Failed to minimize window: ${errMsg}`);
    }
  };

  const handleMaximizeRestore = async () => {
    try {
      await appWindow.toggleMaximize();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      await error(`Failed to toggle maximize/restore: ${errMsg}`);
    }
  };

  const handleClose = async () => {
    try {
      await appWindow.close();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      await error(`Failed to close window: ${errMsg}`);
    }
  };

  return (
    <div data-tauri-drag-region className="titlebar">
      <TitlebarToolbar />
      <TitlebarButton
        label="Back"
        onClick={() => dispatch(openSettingsModal())}
      >
        <Icon icon="material-symbols:settings" className="titlebar__icon" />
      </TitlebarButton>

      <div className="titlebar-control__container">
        <TitlebarButton label="Minimize" onClick={handleMinimize}>
          <Icon icon="mdi:window-minimize" className="titlebar__icon" />
        </TitlebarButton>
        <TitlebarButton
          label="Maximize/Restore"
          onClick={handleMaximizeRestore}
        >
          <Icon icon="mdi:window-maximize" className="titlebar__icon" />
        </TitlebarButton>
        <TitlebarButton
          label="Close"
          onClick={handleClose}
          className="close-button"
        >
          <Icon icon="mdi:close-thick" className="titlebar__icon" />
        </TitlebarButton>
      </div>
    </div>
  );
}
