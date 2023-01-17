import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users/friends/${currentId}`
        );
        setFriends(res.data);
      } catch (error) {}
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handleClick(friend);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                friend.profilePicture
                  ? PF + friend.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
