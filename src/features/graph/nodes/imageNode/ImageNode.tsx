import './imageNode.styles.css'
import { GraphNode } from "@/features/graph/graphview"
import { getNodeById } from '@/redux/nodeSelector'
import { RootState } from '@/redux/store'
import React from "react"
import { useSelector } from 'react-redux'


type ImageNodeProps = {
    id: string
}

const OptimizedImage = React.memo(({ src }: { src: string}) => (
    <img
        src={src}
        loading="lazy"
        className="image-node__image"
        alt={"Image node"}
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
    />
))


const ImageNode = ({ id }: ImageNodeProps) => {

    const node = useSelector((state: RootState) => getNodeById(state, id))

    return (
        <GraphNode nodeId={id} aspectRatio={node?.aspect ?? 1} className="image-node">
            <OptimizedImage src={node?.data.src ?? "/fallback-image.png"} />
        </GraphNode>
    )
}

export default ImageNode