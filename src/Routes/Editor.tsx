import KeybindControl from "@/features/keybinds/components/KeybindControl";
import { GraphView } from "@/features/graph/graphview";
import DotGrid from "@/features/graph/grid/DotGrid";
import NodeCanvas from "@/features/graph/renderer/components/NodesRenderer";
import { AppDropzone } from "@/features/importing/filedrop";
import SidebarButton, { Sidebar } from "@/features/sidebar";
import { isSidebarOpen } from "@/store/app/appSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addLayer,
  selectAllLayers,
  selectLayer,
  selectSelectedLayerId,
} from "@/features/graph";
import { v4 as uuidv4 } from "uuid";

export default function Editor() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useSelector(isSidebarOpen);
  const layers = useAppSelector(selectAllLayers);
  const selectedLayerId = useAppSelector(selectSelectedLayerId);

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
        {layers.map((layer) => (
          <SidebarButton
            key={layer.id}
            label={layer.name}
            icon={layer.icon}
            selected={selectedLayerId === layer.id}
            onClick={() => dispatch(selectLayer(layer.id))}
          />
        ))}
        <SidebarButton
          className="add-layer__button"
          onClick={handleAddLayer}
          label={"+"}
          selected={true}
        />
      </Sidebar>
      <div className="expand-box">
        <AppDropzone />
        <GraphView grid={<DotGrid />}>
          <NodeCanvas />
        </GraphView>
      </div>
    </div>
  );
}
