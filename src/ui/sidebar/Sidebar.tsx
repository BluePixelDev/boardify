import { useDispatch } from "react-redux";
import "./sidebar.styles.css";
import { toggleSidebar } from "@/redux/app/appSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

type SidebarProps = {
  isExpanded?: boolean;
  children?: React.ReactNode;
};

export default function Sidebar({ isExpanded, children }: SidebarProps) {
  const dispatch = useDispatch();
  const handleSidebarToggle = () => dispatch(toggleSidebar());

  return (
    <div className="sidebar-container">
      <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="sidebar-content">
          <div className="sidebar-inner">{children}</div>
        </div>
      </aside>
      <div
        className={`sidebar-toggle ${isExpanded ? "expanded" : "collapsed"}`}
        onClick={handleSidebarToggle}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <Icon icon="bxs:left-arrow" className="sidebar-toggle__icon" />
      </div>
    </div>
  );
}
