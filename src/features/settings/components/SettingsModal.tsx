import { Modal } from "@/features/modal"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import "./settingsModal.styles.css"
import { SnippetControls } from "./snippets/SnippetControls"

interface SettingsModalProps {
    onClose?: () => void
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
    return (
        <Modal className="settings__modal" onClose={onClose}>
            <Tabs defaultIndex={0} className="settings__tabs">
                <TabList className="settings__tab-list">
                    <Tab className="settings__tab" selectedClassName="settings__tab--active">General</Tab>
                    <Tab className="settings__tab" selectedClassName="settings__tab--active">Appearance</Tab>
                    <Tab className="settings__tab" selectedClassName="settings__tab--active">Shortcuts</Tab>
                    <Tab className="settings__tab" selectedClassName="settings__tab--active">About</Tab>
                </TabList>

                <TabPanel className="settings__panel">
                    <input type="checkbox" id="auto-launch" className="" />
                    <input type="text" id="language" className="" />
                    <input type="range" className="styled-slider" />
                    <button>Test</button>
                    <button className="accent">Test</button>

                    <p className="settings__panel-text">Options like language, auto-launch, etc.</p>
                </TabPanel>

                <TabPanel className="settings__panel">
                    <SnippetControls />
                </TabPanel>

                <TabPanel className="settings__panel">
                    <p className="settings__panel-text">Customize keyboard shortcuts here.</p>
                </TabPanel>

                <TabPanel className="settings__panel">
                    <p className="settings__panel-text">App version, author info, and licensing.</p>
                </TabPanel>
            </Tabs>
        </Modal>
    )
}
