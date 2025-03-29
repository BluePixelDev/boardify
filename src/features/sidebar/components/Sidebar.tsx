import { useDispatch } from "react-redux";
import "../sidebarStyles.css"
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
        <>
            <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-content">
                    <div className="sidebar-inner">
                        {children}
                    </div>
                </div>

                <button className="sidebar-toggle" onClick={handleSidebarToggle}>
                    <Icon icon={isExpanded ? "bi:chevron-left" : "bi:chevron-right"} />
                </button>
            </aside>
        </>
    );
}
