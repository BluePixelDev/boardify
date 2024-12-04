import { CSSProperties } from "react"

type Props = {
    offsetX: number,
    offsetY: number,
    scale?: number
}

export default function(props: Props) {
    
    const style: CSSProperties = {
        backgroundImage: "url(./default-grid.png)",
        backgroundPosition: `calc(50% + ${props.offsetX}px) calc(50% + ${props.offsetY}px)`,
        backgroundSize: `${props.scale ? props.scale * 100 : 100}%`,
        backgroundRepeat: "repeat",
        opacity: 0.1
    }

    return (
        <div className={"board-grid-default"} style={style}>

        </div>
    )
}