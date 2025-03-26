import React, { CSSProperties } from "react";

type ResizeHandleProps = {
    style?: CSSProperties;
    direction: string;
    width: number;
    height: number;
    onMouseDown: (event: React.MouseEvent, direction: string) => void;
};

export default function ResizeHandle(props: ResizeHandleProps) {
    const { style, direction, width, height, onMouseDown } = props;
    return (
        <div
            style={{
                ...style,
                width,
                height,
                backgroundColor: "purple",
                borderRadius: "100%",
                cursor: `${direction}-resize`,
            }}
            onMouseDown={(e) => onMouseDown(e, direction)}
        />
    );
}
