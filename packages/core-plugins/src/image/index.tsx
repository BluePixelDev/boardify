import { Plugin } from "@boardify/sdk";
import { createImageImporterHandler } from "./imageImporthandler";
import { ImageNodeRenderer } from "./ImageNodeRenderer";

export default class ImagePlugin extends Plugin {
  attach(): void | Promise<void> {
    this.app.importers.register(createImageImporterHandler(this.app), 10);
    this.app.renderers.register("image", (ctx) => (
      <ImageNodeRenderer app={this.app} nodeId={ctx.nodeId} />
    ));
  }
  detach?(): void | Promise<void> {}
}
