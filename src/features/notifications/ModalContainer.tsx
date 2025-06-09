import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux";
import { clearNotification } from "@/redux/notificationsSlice";
import ErrorPopup from "./components/ErrorPopup";

const NotificationOverlay = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.notifications);

  if (!message) return null;

  const handleClose = () => dispatch(clearNotification());

  return <ErrorPopup message={message} onClose={handleClose} />;
};

export default NotificationOverlay;
