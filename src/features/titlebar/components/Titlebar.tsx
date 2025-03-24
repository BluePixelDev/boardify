import "../titlebar.styles.css";
import ToolbarButton from "./TitlebarButton";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Icon } from "@iconify/react";
import TitlebarDropdown from "./TitlebarDropdown";

const appWindow = getCurrentWindow();
export default function titlebar() {
    const handleMinimize = async () => {
        try {
            await appWindow.minimize();
        } catch (err) {
            console.error("Failed to minimize window:", err);
        }
    };

    const handleMaximizeRestore = async () => {
        try {
            await appWindow.toggleMaximize();
        } catch (err) {
            console.error("Failed to toggle maximize/restore:", err);
        }
    };

    const handleClose = async () => {
        try {
            await appWindow.close();
        } catch (err) {
            console.error("Failed to close window:", err);
        }
    };

    return (
        <div data-tauri-drag-region className="titlebar">
            <TitlebarDropdown />

            <div className="titlebar-button__container">
                <ToolbarButton label="Minimize" onClick={handleMinimize}>
                    <Icon icon="mdi:window-minimize" width="24" height="24" />
                </ToolbarButton>
                <ToolbarButton label="Maximize/Restore" onClick={handleMaximizeRestore}>
                    <Icon icon="mdi:window-maximize" width="24" height="24" />
                </ToolbarButton>
                <ToolbarButton label="Close" onClick={handleClose} className="close-button">
                    <Icon icon="mdi:close-thick" width="24" height="24" />
                </ToolbarButton>
            </div>
        </div>
    );
}
