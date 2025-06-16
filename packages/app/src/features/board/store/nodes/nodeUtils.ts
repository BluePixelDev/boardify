import { NodeData } from "@/features/board";
import { nodesAdapter, NodesState } from "./nodesAdapter";

export const doesNodeIntersectRect = (
  node: NodeData,
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  const nodeLeft = node.position.x;
  const nodeRight = node.position.x + node.size.width;
  const nodeTop = node.position.y;
  const nodeBottom = node.position.y + node.size.height;

  const rectLeft = rect.x;
  const rectRight = rect.x + rect.width;
  const rectTop = rect.y;
  const rectBottom = rect.y + rect.height;

  return (
    nodeLeft < rectRight &&
    nodeRight > rectLeft &&
    nodeTop < rectBottom &&
    nodeBottom > rectTop
  );
};

export function getMaxZIndex(state: NodesState): number {
  const zIndices = Object.values(state.entities)
    .filter((n): n is NodeData => !!n)
    .map((n) => n.zIndex ?? 0);

  if (zIndices.length === 0) return 0;

  return Math.max(...zIndices);
}

export function getMinZIndex(state: NodesState): number {
  const zIndices = Object.values(state.entities)
    .filter((n): n is NodeData => !!n)
    .map((n) => n.zIndex ?? 0);

  if (zIndices.length === 0) return -1;

  return Math.min(...zIndices);
}

export function normalizeZIndices(state: NodesState) {
  const nodes = Object.values(state.entities).filter((n): n is NodeData => !!n);
  const sortedNodes = nodes.sort((a, b) => a.zIndex - b.zIndex);

  sortedNodes.forEach((node, index) => {
    if (node.zIndex !== index) {
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: index },
      });
    }
  });
}

export function moveMultipleNodesForward(state: NodesState, nodeIds: string[]) {
  const nodes = Object.values(state.entities).filter((n): n is NodeData => !!n);

  const maxZ = getMaxZIndex(state);
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const movableNodes = nodeIds
    .map((id) => nodeMap.get(id))
    .filter((node): node is NodeData => !!node && node.zIndex < maxZ);

  movableNodes.sort((a, b) => b.zIndex - a.zIndex);

  movableNodes.forEach((node) => {
    const occupyingNode = nodes.find((n) => n.zIndex === node.zIndex + 1);
    if (occupyingNode && nodeIds.includes(occupyingNode.id)) {
      node.zIndex += 1;
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex },
      });
    } else if (!occupyingNode) {
      node.zIndex += 1;
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex },
      });
    } else {
      nodesAdapter.updateOne(state, {
        id: occupyingNode.id,
        changes: { zIndex: occupyingNode.zIndex - 1 },
      });
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex + 1 },
      });
    }
  });

  normalizeZIndices(state);
}

export function moveMultipleNodesBackward(
  state: NodesState,
  nodeIds: string[]
) {
  const nodes = Object.values(state.entities).filter((n): n is NodeData => !!n);

  const minZ = getMinZIndex(state);
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const movableNodes = nodeIds
    .map((id) => nodeMap.get(id))
    .filter((node): node is NodeData => !!node && node.zIndex > minZ);

  movableNodes.sort((a, b) => a.zIndex - b.zIndex);

  movableNodes.forEach((node) => {
    const occupyingNode = nodes.find((n) => n.zIndex === node.zIndex - 1);
    if (occupyingNode && nodeIds.includes(occupyingNode.id)) {
      node.zIndex -= 1;
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex },
      });
    } else if (!occupyingNode) {
      node.zIndex -= 1;
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex },
      });
    } else {
      nodesAdapter.updateOne(state, {
        id: occupyingNode.id,
        changes: { zIndex: occupyingNode.zIndex + 1 },
      });
      nodesAdapter.updateOne(state, {
        id: node.id,
        changes: { zIndex: node.zIndex - 1 },
      });
    }
  });

  normalizeZIndices(state);
}
