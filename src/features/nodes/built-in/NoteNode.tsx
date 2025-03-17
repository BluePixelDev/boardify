import MDEditor from "@uiw/react-md-editor";
import GraphNode from "../../graphview/components/GraphNode";
import { type NodeRenderer } from "../renderer/rendererRegistry";
import { useDispatch } from "react-redux";
import { updateNode } from "@/redux/nodesSlice";
interface NoteNodeData {
    text: string;
}

const NoteNode: NodeRenderer<NoteNodeData> = ({ node }) => {
    const dispatch = useDispatch()
    const handleDataChange = (newText: string) => dispatch(updateNode({ ...node, data: { ...node.data, text: newText } }))
    return (
        <GraphNode nodeId={node.id}>
            <MDEditor
                value={node.data.text}
                onChange={(value) => handleDataChange(value ?? "")}
            />
            <MDEditor.Markdown source={node.data.text} style={{ whiteSpace: 'pre-wrap' }} />
        </GraphNode>
    )
}

export default NoteNode;