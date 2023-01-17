import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./conversation.css";

const Conversation = ({ conversation }) => {
  const [userFriend, setUserFriend] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== user._id
    );
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users?userId=${friendId}`
        );
        setUserFriend(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user, conversation]);

  return (
    <div className="conversation">
      <img
        src={userFriend?.profilePicture ? PF + userFriend?.profilePicture : PF + "/person/noAvatar.png"}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{userFriend?.username}</span>
    </div>
  );
};

export default Conversation;
