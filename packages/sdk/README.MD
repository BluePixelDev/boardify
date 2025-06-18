# Boardify SDK

This is sdk package for plugin development for the boardify app. In here you can find types and api interfaces for easier communication with the app.

At the basis of the API is `sdk` keyword which contains:

- **Services**, such as import, render and node.
- **Hooks**, react type hooks for data fetching
- **Utilities**, utility functions for easier manipulation

## Creating first plugin

To create a plugin you will need to create a new node project and install this sdk as package. Once that is done, create `manifest.json` and `index.ts`.

### Manifest.json

Manifest.json is a file that is used to describe our plugin and assign it metadata. It usually looks like this:

```json
{
  "id": "plugin-id",
  "name": "Display Name",
  "description": "Hello World Plugin",
  "main": "index.ts", // Entry point for the plugin
  "version": "1.0.0", // Version of the plugin
  "author": "you", //Name of the author
  "minAppVersion": "0.2.0"
}
```

### Index.ts

The actual logic for the plugin goes into index.ts or other script file based on your manifest config. A basic plugin entry point looks like this.

```ts
import { PluginDefinition, sdk } from "@boardify/sdk";

const plugin: PluginDefinition = {
  attach: () => {
    //Called when the plugin is loaded and active
  },
  detach: () => {
    //Called when the plugin is deactivated or the app closes
  },
};

export default plugin;
```

# Naming Conventions

```js
<plugin>:<domain>.<type>[.<subtype>...]
```

## Exampl

```js
"core:media.image";
```
