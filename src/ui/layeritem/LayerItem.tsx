import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LayerItemProps {
  id: string;
  icon?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}
export default function LayerItem({
  id,
  icon,
  label,
  selected,
  onClick,
}: LayerItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sidebar-item layer-item ${selected ? "selected" : ""}`}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}
      <span className="truncate">{label}</span>
    </div>
  );
}
