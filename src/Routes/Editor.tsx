import { AppDropzone } from "@/features/file-drop";
import { GraphCanvas } from "@/features/graph/graphview/components/GraphCanvas";
import NodeCanvas from "@/features/graph/renderer/NodeCanvas";
import SidebarButton, { Sidebar } from "@/features/sidebar";
import { isSidebarOpen } from "@/redux/appSelector";
import { useSelector } from "react-redux";

export default function Editor() {
    const sidebarOpen = useSelector(isSidebarOpen)

    return (
        <>
            <AppDropzone />
            <div className="expand-box">
                <Sidebar isExpanded={sidebarOpen}>
                    <SidebarButton label="Hello" icon="mdi:close" selected={true} />
                    <SidebarButton label="Hello" selected={false} />
                    <SidebarButton label="Hello" selected={false} />
                    <SidebarButton label="Hello" selected={false} />
                </Sidebar>
                <div className="expand-box">
                    <GraphCanvas>
                        <NodeCanvas />
                    </GraphCanvas>
                </div>

            </div >
        </>
    )
}