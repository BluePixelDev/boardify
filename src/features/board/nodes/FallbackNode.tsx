import BoardNode from "@/features/board/nodes/BoardNode";

interface FallbackNodeProps {
  nodeId: string;
}

export const FallbackNode = ({ nodeId }: FallbackNodeProps) => {
  return (
    <BoardNode
      nodeId={nodeId}
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
