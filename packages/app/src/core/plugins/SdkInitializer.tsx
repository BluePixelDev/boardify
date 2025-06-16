import { BoardNode, useNode } from "@/features/board";
import {
  registerComponents,
  registerHooks,
  registerServices,
  registerUtilities,
} from "@boardify/sdk";
import { useEffect } from "react";
import { importerRegistry } from "../importers";
import { rendererRegistry } from "../renderers";
import {
  createBaseNode,
  createNodeFromImportEvent,
  getFileFormat,
} from "@/utils";
import { createNodeService } from "./nodeService";
import { useAppDispatch, useAppSelector } from "@/redux";

export function SdkInitializer() {
  const dispatch = useAppDispatch();
  const getState = useAppSelector((state) => () => state);

  useEffect(() => {
    registerComponents({
      BoardNode,
    });
    registerServices({
      import: importerRegistry,
      render: rendererRegistry,
      nodeService: createNodeService(dispatch, getState),
    });
    registerHooks({
      useNode,
    });
    registerUtilities({
      createNodeFromImportEvent,
      createBaseNode,
      getFileFormat,
    });
  }, []);
  return null;
}
