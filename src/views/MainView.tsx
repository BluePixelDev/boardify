import { AppDropzone } from "@/features/file-drop";
import GraphView from "@/features/graphview/components/GraphView";
import NodeCanvas from "@/features/nodes/renderer/NodeCanvas";
import { Sidebar, SidebarItem } from "@/features/sidebar";
import { isSidebarOpen } from "@/redux/appSelector";
import { useSelector } from "react-redux";

export default function MainView() {
    const sidebarOpen = useSelector(isSidebarOpen)

    return (
        <>
            <AppDropzone />
            <div className={"flex flex-1"}>
                <Sidebar isExpanded={sidebarOpen}>
                    <SidebarItem label="Hello" icon="mdi:close" selected={true} />
                    <SidebarItem label="Hello" selected={false} />
                    <SidebarItem label="Hello" selected={false} />
                    <SidebarItem label="Hello" selected={false} />
                </Sidebar>
                <div className="flex flex-1">
                    <GraphView graph={{
                        maxZoom: 5,
                        minZoom: 0.1
                    }}>
                        <NodeCanvas />
                    </GraphView>
                </div>

            </div>
        </>
    )
}