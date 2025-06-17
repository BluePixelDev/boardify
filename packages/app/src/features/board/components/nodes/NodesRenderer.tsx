import { useAppSelector } from "@/redux";
import { rendererRegistry } from "@/services/renderer";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackNode } from "./FallbackNode";
import { NodeData, selectVisibleNodes } from "../..";

export function NodesRenderer() {
  const nodes = useAppSelector(selectVisibleNodes);

  return (
    <>
      {nodes.map((node: NodeData<unknown>) => {
        const Renderer = rendererRegistry.get(node.type);
        return (
          <ErrorBoundary
            key={node.id}
            fallbackRender={() => {
              return <FallbackNode nodeId={node.id} />;
            }}
          >
            {Renderer ? (
              <Renderer nodeId={node.id} />
            ) : (
              <FallbackNode nodeId={node.id} />
            )}
          </ErrorBoundary>
        );
      })}
    </>
  );
}
