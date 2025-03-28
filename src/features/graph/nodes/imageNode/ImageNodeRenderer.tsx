import { IRenderer } from "../../renderer";
import { IRendererProps } from "../../renderer/IRenderer";
import ImageNode from "./ImageNode";

export class ImageNodeRenderer implements IRenderer {
    render = (props: IRendererProps): JSX.Element | null => {
        const { data } = props;
        if (!data || !data.imageUrl) {
            return null;
        }

        return (
            <ImageNode id={props.nodeId}/>
        );
    };
}