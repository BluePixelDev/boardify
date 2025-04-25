import { GraphNodeData } from "@/features/graph"
import { IRenderer } from "@/features/graph/renderer"
import { VideoNodeData } from "./types"
import VideoNode from "./VideoNode"

export class VideoNodeRenderer implements IRenderer<VideoNodeData> {
    render = (node: GraphNodeData<unknown>): JSX.Element | null => {
        const nodeData = node as GraphNodeData<VideoNodeData>
        const data = nodeData.data

        if (!nodeData) return null
        if (!data || !data.src) {
            return null
        }

        return (
            <VideoNode node={node as GraphNodeData<VideoNodeData>} />
        )
    }
}