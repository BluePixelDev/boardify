import { nodesSelectors } from "./nodesSlice";
import { createSelector } from "reselect";
import { RootState } from "@/redux";
import { selectSelectedLayerId } from "../layersSelectors";
import { NodeData } from "../../types";

const selectGraphState = (state: RootState) => state.board.nodes;

export const selectAllNodes = (state: RootState) =>
  nodesSelectors.selectAll(selectGraphState(state));

export const selectNodeById =
  <T = unknown>(id: string) =>
  (state: RootState): NodeData<T> | undefined =>
    nodesSelectors.selectById(selectGraphState(state), id) as
      | NodeData<T>
      | undefined;

export const selectSelectedNodeIds = (state: RootState) =>
  selectGraphState(state).selectedNodeIds;

export const selectSelectedNodes = createSelector(
  selectAllNodes,
  selectSelectedNodeIds,
  (nodes, ids) => nodes.filter((n) => ids.includes(n.id))
);
export const selectNodesByLayer = (layerId: string) =>
  createSelector(selectAllNodes, (nodes) =>
    nodes.filter((n) => n.layerId === layerId)
  );

export const isNodeSelected = (nodeId: string) =>
  createSelector(selectSelectedNodeIds, (selectedIds) =>
    selectedIds.includes(nodeId)
  );

export const selectVisibleNodes = createSelector(
  selectAllNodes,
  selectSelectedLayerId,
  (nodes, selLayer) =>
    nodes
      .filter((n) => n.layerId === selLayer)
      .sort((a, b) => a.zIndex - b.zIndex)
);

export const selectVisibleNodesIds = createSelector(
  selectAllNodes,
  selectSelectedLayerId,
  (nodes, selLayer) =>
    nodes
      .filter((n) => n.layerId === selLayer)
      .sort((a, b) => a.zIndex - b.zIndex)
      .map((ctx) => ctx.id)
);
