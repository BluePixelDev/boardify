import { CSSProperties } from "react"
import { useGraphViewContext } from "../graph-view/GraphView";

export default function GridBackground() {

    const { scale, translate } = useGraphViewContext();

    const style: CSSProperties = {
        backgroundImage: "url(./default-grid.png)",
        backgroundPosition: `${translate.x}px ${translate.y}px`,
        backgroundSize: `${scale * 1000}px`,
        backgroundRepeat: "repeat",
        opacity: 0.1
    }

    return <div className={"board-grid-default"} style={style} />
}