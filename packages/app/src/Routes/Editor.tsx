import DotGrid from "@/features/board/components/grid/DotGrid";
import SidebarButton, { Sidebar } from "@/ui/sidebar";
import { isSidebarOpen } from "@/redux/selectors/appSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux";
import { v4 as uuidv4 } from "uuid";
import { KeybindControl } from "@/features/keybinds";
import { FileDropzone } from "@/ui/dropzone";
import { selectAllLayers } from "@/features/board/store/layersSelectors";
import {
  addLayer,
  BoardView,
  LayersSidebar,
  NodesRenderer,
  selectLayer,
} from "@/features/board";
import { OverlayHandlesLayer } from "@/features/board/components/selection/OverlayHandlesLayer";

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
        <BoardView grid={<DotGrid />} overlay={<OverlayHandlesLayer />}>
          <NodesRenderer />
        </BoardView>
      </div>
    </div>
  );
}
