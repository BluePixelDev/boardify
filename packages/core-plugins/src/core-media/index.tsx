import { Plugin } from "@boardify/sdk";
import { createImageImporterHandler } from "./imageImporthandler";
import { ImageNodeRenderer } from "./ImageNodeRenderer";
import { MediaNodeTypes } from "./mediaNodeTypes";

export default class ImagePlugin extends Plugin {
  attach(): void | Promise<void> {
    this.app.importers.register({
      id: MediaNodeTypes.Image,
      handler: createImageImporterHandler(this.app),
      priority: 100,
    });
    this.app.renderers.register({
      id: MediaNodeTypes.ImageImporter,
      match: (type: string) => {
        return type === MediaNodeTypes.Image;
      },
      component: (ctx) => (
        <ImageNodeRenderer app={this.app} nodeId={ctx.nodeId} />
      ),
      priority: 100,
    });
  }
  detach?(): void | Promise<void> {}
}
