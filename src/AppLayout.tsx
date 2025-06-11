import { ToastContainer } from "react-toastify";
import { NotificationOverlay } from "./features/notifications";
import {
  isSettingsModalOpen,
  SettingsModal,
  toggleSettingsModal,
} from "./features/settings";
import CSSSnippets from "./features/snippets/Snippets";
import { Titlebar, ToolbarProvider } from "./features/titlebar";
import { ModalContainer } from "./ui/modal";
import { ThemeProvider } from "./features/theme";
import { PluginManager } from "./core/plugins";
import { useAppDispatch, useAppSelector } from "./redux";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const settingsOpen = useAppSelector(isSettingsModalOpen);
  const dispatch = useAppDispatch();

  return (
    <PluginManager>
      <ThemeProvider>
        <ToolbarProvider>
          <CSSSnippets />
          <Titlebar />
          <NotificationOverlay />
          <ModalContainer
            className="modal-dim settings-modal__container"
            show={settingsOpen}
          >
            <SettingsModal onClose={() => dispatch(toggleSettingsModal())} />
          </ModalContainer>
          <ToastContainer />
          <div className="app-container">{children}</div>
        </ToolbarProvider>
      </ThemeProvider>
    </PluginManager>
  );
};
