import { ToastContainer } from "react-toastify"
import AppSetup from "./AppSetup"
import { NotificationOverlay } from "./features/notifications"
import { isSettingsModalOpen, SettingsModal, toggleSettingsModal } from "./features/settings"
import CSSSnippets from "./features/snippets/CSSSnippets"
import { Titlebar, ToolbarProvider } from "./features/titlebar"
import { ModalContainer } from "./features/modal"
import { AppTheme } from "./features/theme"
import { PluginManager } from "./features/plugins"
import { useAppDispatch, useAppSelector } from "./store"

interface AppLayoutProps {
    children: React.ReactNode
}

export const AppLayout = (({ children }: AppLayoutProps) => {

    const settingsOpen = useAppSelector(isSettingsModalOpen)
    const dispatch = useAppDispatch()

    return (
        <PluginManager>
            <AppTheme>
                <ToolbarProvider>

                    <AppSetup />
                    <CSSSnippets />
                    <Titlebar />
                    <NotificationOverlay />
                    <ModalContainer className="modal-dim settings-modal__container" show={settingsOpen}>
                        <SettingsModal onClose={() => dispatch(toggleSettingsModal())} />
                    </ModalContainer>
                    <ToastContainer />
                    <div className="app-container">
                        {children}
                    </div>
                </ToolbarProvider>
            </AppTheme>
        </PluginManager>
    )
})