import { AppDropzone } from "@/features/file-drop";
import { GraphView } from "@/features/graph/graphview";
import { GraphViewProvider } from "@/features/graph/graphview/context/GraphViewProvider";
import DotGrid from "@/features/graph/grid/DotGrid";
import NodeCanvas from "@/features/graph/renderer/NodesRenderer";
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
                    <GraphViewProvider>
                        <GraphView
                            grid={<DotGrid />}
                        >
                            <NodeCanvas />
                        </GraphView>
                    </GraphViewProvider>
                </div>

            </div >
        </>
    )
}