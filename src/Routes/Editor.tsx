import DotGrid from "@/features/board/grid/DotGrid";
import SidebarButton, { Sidebar } from "@/ui/sidebar";
import { isSidebarOpen } from "@/redux/selectors/appSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux";
import { v4 as uuidv4 } from "uuid";
import LayersSidebar from "@/features/board/layers/LayerSidebar";
import { KeybindControl } from "@/features/keybinds";
import NodesRenderer from "../features/board/nodes/NodesRenderer";
import { FileDropzone } from "@/ui/dropzone";
import { FallbackNode } from "../features/board/nodes/FallbackNode";
import { selectAllLayers } from "@/redux/selectors/layersSelectors";
import { BoardView } from "@/features/board";
import { addLayer, selectLayer } from "@/redux/slices/layersSlice";

export default function Editor() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useSelector(isSidebarOpen);
  const layers = useAppSelector(selectAllLayers);

  const handleAddLayer = () => {
    const newLayer = {
      id: uuidv4(),
      name: `Layer ${layers.length + 1}`,
      color: "orange",
      icon: "bxs:layer",
    };
    dispatch(addLayer(newLayer));
    dispatch(selectLayer(newLayer.id));
  };

  return (
    <div className="editor-container">
      <KeybindControl />
      <Sidebar isExpanded={sidebarOpen}>
        <LayersSidebar />
        <SidebarButton
          className="add-layer__button"
          onClick={handleAddLayer}
          label={"+"}
          selected={false}
        />
      </Sidebar>
      <div className="expand-box">
        <FileDropzone />
        <BoardView grid={<DotGrid />}>
          <NodesRenderer
            fallback={(nodeId) => {
              return <FallbackNode key={nodeId} nodeId={nodeId} />;
            }}
          />
        </BoardView>
      </div>
    </div>
  );
}
