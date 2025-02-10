import GraphView from "@/features/graphview/components/view/GraphView";
import NodeCanvas from "@/features/nodes/renderer/NodeCanvas";
import AppDropzone from "@/features/file-drop/app-dropzone/AppDropzone";
import { Sidebar, SidebarItem } from "@/features/sidebar";

export default function MainView() {
    return (
        <>
            <AppDropzone />
            <div className={"flex flex-1"}>
                <Sidebar expanded={true}>
                    <SidebarItem label="Hello" icon="mdi:close" selected={true} />
                    <SidebarItem label="Hello" selected={false} />
                    <SidebarItem label="Hello" selected={false} />
                    <SidebarItem label="Hello" selected={false} />
                </Sidebar>
                <div className="flex flex-1">
                    <GraphView graph={{
                        maxZoom: 5,
                        minZoom: 0.5
                    }}>
                        <NodeCanvas />
                    </GraphView>
                </div>

            </div>
        </>
    )
}