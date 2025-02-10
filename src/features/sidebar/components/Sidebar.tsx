import "../sidebarStyles.css"
import { motion } from "framer-motion";

type SidebarProps = {
    expanded?: boolean;
    children?: React.ReactNode;
};

export default function Sidebar({ expanded, children }: SidebarProps) {
    return (
        <motion.div
            initial={{ width: expanded ? 250 : 0 }}
            animate={{ width: expanded ? 250 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="app-sidebar"
        >
            {children}
        </motion.div>
    );
}
