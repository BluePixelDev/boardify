import { IRenderer } from "../../renderer";
import { GraphNodeData } from "../node.types";
import ImageNode from "./ImageNode";
import { ImageNodeData } from "./imageNode.types";

export class ImageNodeRenderer implements IRenderer {
    render = (node: GraphNodeData<ImageNodeData>): JSX.Element | null => {
        const data = node?.data;
        if (!data || !data.imageUrl) {
            return null;
        }
        
        return <ImageNode node={node} />;
    };
}