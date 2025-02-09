import GraphView from "@/features/graphview/components/view/GraphView";
import NodeCanvas from "@/features/nodes/renderer/NodeCanvas";
import AppDropzone from "@/features/file-drop/app-dropzone/AppDropzone";

export default function MainView() {
    return (
        <>
            <AppDropzone />
            <div className={"absolute w-full h-full"}>
                <GraphView graph={{
                    maxZoom: 5,
                    minZoom: 0.5
                }}>
                    <NodeCanvas />
                </GraphView>
            </div>
        </>
    )
}