import { CSSProperties } from "react"

type ZLayerProps = {
    zIndex: number,
    styles?: CSSProperties
    className?: string | undefined,
    children: JSX.Element | JSX.Element[]
}

export default function (props: ZLayerProps) {
    return <div style={{ ...props.styles, zIndex: props.zIndex }} className={props.className}>
        {props.children}
    </div>
}