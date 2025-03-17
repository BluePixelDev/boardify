import "../ToolbarStyles.css"
import { Dropdown, DropdownItem } from "@/features/dropdown";

export default function TitlebarDropdown() {
    return (
        <div className="titlebar-items">
            <Dropdown label="File">
                <DropdownItem label="Save" onClick={() => alert("Profile clicked!")} />
                <DropdownItem label="Save as" />
                <DropdownItem label="Open" />
            </Dropdown>
            <Dropdown label="Edit">
                <DropdownItem label="Profile" onClick={() => alert("Profile clicked!")} />
                <DropdownItem label="Settings">
                    <DropdownItem label="Privacy" onClick={() => alert("Privacy clicked!")} />
                    <DropdownItem label="Notifications" onClick={() => alert("Notifications clicked!")} />
                </DropdownItem>
            </Dropdown>
        </div>
    )
}