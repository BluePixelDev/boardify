import { selectNodeById } from "@/redux/selectors/nodesSelectors";
import { NodeData } from "../types";
import { shallowEqual, useSelector } from "react-redux";

export function useNode<T = unknown>(id: string): NodeData<T> | undefined {
  return useSelector(selectNodeById<T>(id), shallowEqual);
}
