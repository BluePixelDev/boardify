import KeybindControl from "@/features/keybinds/components/KeybindControl";
import DotGrid from "@/features/board/ui/grid/DotGrid";
import NodesRenderer from "@/features/board/renderer/components/NodesRenderer";
import { AppDropzone } from "@/features/importing/filedrop";
import SidebarButton, { Sidebar } from "@/ui/sidebar";
import { isSidebarOpen } from "@/redux/app/appSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addLayer,
  BoardView,
  selectAllLayers,
  selectLayer,
} from "@/features/board";
import { v4 as uuidv4 } from "uuid";
import LayersSidebar from "@/ui/panels/LayerSidebar";

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
        <AppDropzone />
        <BoardView grid={<DotGrid />}>
          <NodesRenderer />
        </BoardView>
      </div>
    </div>
  );
}
