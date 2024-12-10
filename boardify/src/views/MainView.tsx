import AppDropzone from "@/components/file-drop/app-dropzone/AppDropzone";
import GraphView from "@/components/graph/graph-view/GraphView";
import NodeManagerContext from "@/components/node-system/NodeManagerContext";
import NodeRenderer from "@/components/node-system/NodeRenderer";

export default function MainView() {
    return (
        <>
            <AppDropzone />
            <div className={"absolute w-full h-full"}>
                <NodeManagerContext>
                    <GraphView graph={{
                        maxZoom: 5,
                        minZoom: 0.5
                    }}>
                        <NodeRenderer />
                    </GraphView>
                </NodeManagerContext>
            </div>
        </>
    )
}