import { useDispatch } from "react-redux";
import "./sidebar.styles.css"
import { toggleSidebar } from "@/features/app/appSlice";
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

                <button className={`sidebar-toggle ${isExpanded ? 'expanded' : ''}`} onClick={handleSidebarToggle}>
                    <Icon icon="bxs:left-arrow" className="sidebar-toggle__icon" />
                </button>
            </aside>
        </>
    );
}
