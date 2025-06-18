import { usePluginManager } from "./PluginProvider";

export function PluginDebugPanel() {
  const { plugins } = usePluginManager();
  const pluginEntries = Array.from(plugins.entries());

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <h3>Loaded Plugins</h3>
      {pluginEntries.length === 0 ? (
        <p>No plugins loaded yet.</p>
      ) : (
        <ul>
          {pluginEntries.map(([id, { instance, manifest }]) => (
            <li key={id} style={{ marginBottom: "1rem" }}>
              <strong>{manifest.name}</strong> ({manifest.id})<br />
              <small>Version:</small> {manifest.version}
              <br />
              {manifest.description && (
                <>
                  <small>Description:</small> {manifest.description}
                  <br />
                </>
              )}
              {manifest.author && (
                <>
                  <small>Author:</small> {manifest.author}
                  <br />
                </>
              )}
              {manifest.homepage && (
                <>
                  <small>Homepage:</small>{" "}
                  <a
                    href={manifest.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {manifest.homepage}
                  </a>
                  <br />
                </>
              )}
              <small>Class:</small> {instance.constructor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
