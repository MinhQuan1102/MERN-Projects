import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:8800/api/posts/like/${post._id}`, {
        userId: currentUser._id,
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error)
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${post._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeDisplay = (like) => {
    if (like === 0) {
      return (
        <span className="postLikeCounter">{isLiked ? "You like it" : ""}</span>
      );
    } else {
      return (
        <span className="postLikeCounter">
          {isLiked ? "You and " : ""}
          {like} people like it
        </span>
      );
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              {" "}
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                className="postProfileImg"
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <div className="postDate">{format(post.createdAt)}</div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
            <ClearIcon onClick={deletePost} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            {handleLikeDisplay(like)}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
