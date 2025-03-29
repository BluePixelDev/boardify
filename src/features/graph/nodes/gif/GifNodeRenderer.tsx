import { IRenderer } from "../../renderer";
import { GIFNodeData } from "./gifNode.types";
import GIFNode from "./GifNode";
import { GraphNodeData } from "../node.types";

export class GifNodeRenderer implements IRenderer<GIFNodeData> {
    render = (node: GraphNodeData<GIFNodeData>): JSX.Element | null => {
        const data = node?.data;
        if (!data || !data.gifURL) {
            console.log(data)
            return null;
        }

        return <GIFNode node={node} />;
    };
}