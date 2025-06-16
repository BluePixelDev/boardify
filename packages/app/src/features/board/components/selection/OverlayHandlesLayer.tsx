import { useAppSelector } from "@/redux";
import { OverlayHandles } from "./OverlayHandles";
import { selectSelectedNodeIds } from "../..";

export function OverlayHandlesLayer() {
  const selectedNodesIds = useAppSelector(selectSelectedNodeIds);

  return (
    <>
      {selectedNodesIds.map((nodeId) => (
        <OverlayHandles key={nodeId} nodeId={nodeId} />
      ))}
    </>
  );
}
