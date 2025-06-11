import { RootState, useAppSelector } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import {
  rectIntersection,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LayerItem from "./LayerItem";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { selectAllLayers } from "@/redux/selectors/layersSelectors";
import { reorderLayer, selectLayer } from "@/redux/slices/layersSlice";

export default function LayersSidebar() {
  const dispatch = useDispatch();
  const layers = useAppSelector(selectAllLayers);
  const selectedId = useSelector(
    (state: RootState) => state.board.layers.selectedLayerId
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = layers.findIndex((l) => l.id === active.id);
      const newIndex = layers.findIndex((l) => l.id === over.id);
      dispatch(reorderLayer({ oldIndex, newIndex }));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext
        items={layers.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1 p-2">
          {layers.map((layer) => (
            <LayerItem
              key={layer.id}
              id={layer.id}
              icon={layer.icon}
              label={layer.name}
              selected={selectedId === layer.id}
              onClick={() => dispatch(selectLayer(layer.id))}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
