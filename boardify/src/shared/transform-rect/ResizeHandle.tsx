import { CSSProperties } from "react"

type ResizeHandleProps = {
    style?: CSSProperties;
    direction: string;
    width: number;
    height: number;
    onMouseDown: (event: React.MouseEvent, direction: string) => void;
}

export default function (props: ResizeHandleProps) {

    return (
        <div
            className={"absolute"}
            style={{
                ...props.style,
                width: props.width,
                height: props.height,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                cursor: `${props.direction}-resize`
            }}
            onMouseDown={(e) => props.onMouseDown(e, 'se')}
        />
    )

}