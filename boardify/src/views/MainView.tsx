import GraphView from "@/features/board/graph-view/GraphView";
import NodeLogic from "@/features/board/node-logic/NodeLogic";
import AppDropzone from "@/features/file-drop/file-drop/app-dropzone/AppDropzone";

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