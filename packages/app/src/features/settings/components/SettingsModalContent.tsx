import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import "react-tabs/style/react-tabs.css";
import "./settingsModal.styles.css";
import { SnippetControls } from "./snippets/SnippetControls";
import { Toggle } from "@/ui/toggle/Toggle";
import { useState } from "react";
import { PluginDebugPanel } from "@/services/plugins";
import classNames from "classnames";

const tabLabels = ["General", "Appearance", "Shortcuts", "About"];
export const SettingsModalContent = () => {
  const [booleanValue, setBooleanValue] = useState(false);

  return (
    <TabGroup>
      <div className="settings__tabs">
        <TabList className="settings__tab-list">
          {tabLabels.map((label) => (
            <Tab
              key={label}
              className={({ selected }) =>
                classNames("settings__tab", selected && "settings__tab--active")
              }
            >
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel className="settings__panel">
            <Toggle value={booleanValue} onChange={(e) => setBooleanValue(e)} />
            <input type="text" id="language" />
            <input type="range" />
            <input type="checkbox" id="auto-launch" />
            <input type="radio" name="theme" />

            <button>Test</button>
            <button className="accent">Test</button>
            <p className="settings__panel-text">
              Options like language, auto-launch, etc.
            </p>
          </TabPanel>

          <TabPanel className="settings__panel">
            <SnippetControls />
          </TabPanel>

          <TabPanel className="settings__panel">
            <p className="settings__panel-text">
              Customize keyboard shortcuts here.
            </p>
          </TabPanel>

          <TabPanel className="settings__panel">
            <p className="settings__panel-text">
              App version, author info, and licensing.
            </p>
            <PluginDebugPanel />
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};
