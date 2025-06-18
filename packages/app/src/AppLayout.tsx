import { ToastContainer } from "react-toastify";
import { NotificationOverlay } from "./features/notifications";
import {
  isSettingsModalOpen,
  SettingsModalContent,
  toggleSettingsModal,
} from "./features/settings";
import CSSSnippets from "./features/snippets/Snippets";
import { Titlebar, ToolbarProvider } from "./features/titlebar";
import { Modal } from "./ui/modal";
import { ThemeProvider } from "./features/theme";
import { PluginProvider } from "./services/plugins";
import { useAppDispatch, useAppSelector } from "./redux";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const settingsOpen = useAppSelector(isSettingsModalOpen);
  const dispatch = useAppDispatch();

  return (
    <PluginProvider>
      <ThemeProvider>
        <ToolbarProvider>
          <CSSSnippets />
          <Titlebar />
          <NotificationOverlay />
          <Modal
            isOpen={settingsOpen}
            onClose={() => dispatch(toggleSettingsModal())}
            title="Settings"
            className="settings__modal"
          >
            <SettingsModalContent />
          </Modal>
          <ToastContainer />
          <div className="app-container">{children}</div>
        </ToolbarProvider>
      </ThemeProvider>
    </PluginProvider>
  );
};
