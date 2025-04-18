import { ToastContainer } from "react-toastify"
import AppSetup from "./AppSetup"
import { NotificationOverlay } from "./features/notifications"
import { SettingsModal } from "./features/settings"
import CSSSnippets from "./features/snippets/CSSSnippets"
import { Titlebar, ToolbarProvider } from "./features/titlebar"
import { ModalContainer } from "./features/modal"

interface AppLayoutProps {
    children: React.ReactNode
}

export const AppLayout = (({ children }: AppLayoutProps) => {
    return (
        <ToolbarProvider>
            <AppSetup />
            <CSSSnippets />
            <Titlebar />
            <NotificationOverlay />
            <ModalContainer className="modal-dim">
                <SettingsModal onClose={() => console.log("Should close")} />
            </ModalContainer>
            <ToastContainer />
            <div className="app-container">
                {children}
            </div>
        </ToolbarProvider>
    )
})