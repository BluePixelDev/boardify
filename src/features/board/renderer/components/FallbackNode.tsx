import { BoardNodeProps } from "../../types";
import { BoardNode } from "../../ui/node";

export const FallbackNode = ({ node }: BoardNodeProps<unknown>) => {
  return (
    <BoardNode
      nodeId={node.id}
      aspectRatio={1}
      className="fallback-node"
      resizable={false}
    >
      <h1>
        No node found!
        <br />
        Please check the node type and ensure the renderer is registered.
      </h1>
    </BoardNode>
  );
};
