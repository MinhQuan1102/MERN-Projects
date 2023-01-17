import "./following.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Following = ({ userId }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/profile/${userId}`)
      setUser(res.data)
    };
    fetchPosts();
  }, [userId]);
  return (
    <div className="rightbarFollowing">
      <img
        src={user.profilePicture}
        alt=""
        className="rightbarFollowingImg"
      />
      <span className="rightbarFollowingName">
        {user.username}
      </span>
    </div>
  );
}

export default Following