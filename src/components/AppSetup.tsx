import { ImageImporter } from "@/features/graph/nodes/imageNode/ImageImporter"
import { ImageNodeRenderer } from "@/features/graph/nodes/imageNode/ImageNodeRenderer"
import { rendererRegistry } from "@/features/graph/renderer/RendererRegistry"
import { importerRegistry } from "@/features/importer"
import { useEffect } from "react"

const AppSetup = () => {
    useEffect(() => {
        importerRegistry.registerImporter(new ImageImporter())
        rendererRegistry.registerRenderer("image", new ImageNodeRenderer())

        return () => {
            rendererRegistry.removeRenderer("image")
        }
    })
}

export default AppSetup;