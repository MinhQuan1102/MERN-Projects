import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";


const Topbar = ({ socket }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [friendNotifications, setFriendNotifications] = useState(0);
  const [messageNotifications, setMessageNotifications] = useState(0);
  const [notifications, setotifications] = useState(0);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  console.log(socket)

  // useEffect(() => {
  //   socket.current.on("getNotification", (data) => {
  //     setMessageNotifications((prev) => [...prev, data]);
  //     console.log(data);
  //   });
  // }, [socket, messageNotifications]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MQSocial</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video..."
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
          <span className="topbarLink" onClick={handleLogout}>
            Logout
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            {friendNotifications > 0 && (
              <span className="topbarIconBadge">{friendNotifications}</span>
            )}
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ChatIcon />
              {messageNotifications > 0 && (
                <span className="topbarIconBadge">{messageNotifications}</span>
              )}
            </Link>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            {notifications > 0 && (
              <span className="topbarIconBadge">{notifications}</span>
            )}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
