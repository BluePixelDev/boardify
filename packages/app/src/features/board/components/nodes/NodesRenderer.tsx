import { useAppSelector } from "@/redux";
import { rendererRegistry } from "@/services/renderer";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackNode } from "./FallbackNode";
import { selectVisibleNodes } from "../..";

export function NodesRenderer() {
  const visibleNodes = useAppSelector(selectVisibleNodes);

  return (
    <>
      {visibleNodes.map((node) => {
        const Renderer = rendererRegistry.getRendererForNode(node);

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
