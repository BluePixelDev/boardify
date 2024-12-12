import AppDropzone from "@/components/file-drop/app-dropzone/AppDropzone";
import GraphView from "@/components/graph/graph-view/GraphView";
import NodeLogic from "@/components/node-system/NodeLogic";

export default function MainView() {
    return (
        <>
            <AppDropzone />
            <div className={"absolute w-full h-full"}>
                <GraphView graph={{
                    maxZoom: 5,
                    minZoom: 0.5
                }}>
                    <NodeLogic />
                </GraphView>
            </div>
        </>
    )
}