import "./navbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket, notification]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }

    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  const handleRead = () => {
    setNotification([])
    setOpen(false)
  }

  return (
    <div className="navbar">
      <span className="logo">MQApp</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <NotificationsNoneIcon className="iconImg" />
          {notification.length > 0 && (
            <div className="counter">{notification.length}</div>
          )}
        </div>
        <div className="icon">
          <ChatBubbleOutlineIcon className="iconImg" />
          {/* <div className="counter"></div> */}
        </div>
        <div className="icon">
          <SettingsIcon className="iconImg" />
          {/* <div className="counter"></div> */}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notification.map((noti) => displayNotification(noti))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
