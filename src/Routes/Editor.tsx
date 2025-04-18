import KeybindControl from "@/features/keybinds/components/KeybindControl";
import { GraphView } from "@/features/graph/graphview";
import DotGrid from "@/features/graph/grid/DotGrid";
import NodeCanvas from "@/features/graph/renderer/NodesRenderer";
import { AppDropzone } from "@/features/importing/filedrop";
import SidebarButton, { Sidebar } from "@/features/sidebar";
import { isSidebarOpen } from "@/features/app/selectors";
import { useSelector } from "react-redux";

export default function Editor() {
    const sidebarOpen = useSelector(isSidebarOpen)

    return (
        <div className="editor-container">
            <KeybindControl />
            <Sidebar isExpanded={sidebarOpen}>
                <SidebarButton label="Hello" icon="mdi:close" selected={true} />
                <SidebarButton label="Hello" selected={false} />
                <SidebarButton label="Hello" selected={false} />
                <SidebarButton label="Hello" selected={false} />
            </Sidebar>
            <div className="expand-box">
                <AppDropzone />
                <GraphView
                    grid={<DotGrid />}
                >
                    <NodeCanvas />
                </GraphView>
            </div>
        </div>

    )
}