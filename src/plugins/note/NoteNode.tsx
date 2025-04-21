import './noteNode.styles.css'
import GraphNode from "../../features/graph/nodes/components/GraphNode"
import { type NodeRenderer } from "../../features/graph/renderer/RendererRegistry";
import { useDispatch } from "react-redux";
import { updateNode } from "@/redux/nodes/nodesSlice";
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import 'github-markdown-css';

interface NoteNodeData {
    text: string;
}

const NoteNode: NodeRenderer<NoteNodeData> = ({ node }) => {
    const dispatch = useDispatch();

    const handleDataChange = (newText: string) => {
        dispatch(updateNode({ ...node, data: { ...node.data, text: newText } }));
    };


    return (
        <GraphNode
            nodeId={node.id}
            className="note-node"
        >
            <div className="note-node__container">
                <CodeMirror
                    value={node.data.text}
                    onChange={handleDataChange}
                    extensions={[markdown(), EditorView.lineWrapping]}
                    placeholder="Type your markdown here..."
                    className="no-drag no-zoom note-editor"
                    autoFocus
                    basicSetup={{
                        lineNumbers: false,
                        foldGutter: false,
                        autocompletion: true,
                    }}
                />
            </div>
        </GraphNode>
    );
};

export default NoteNode;
