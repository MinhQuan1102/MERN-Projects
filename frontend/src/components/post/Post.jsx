import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./post.css";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Haha from "../../img/haha.png";
import Like from "../../img/like.png";
import Heart from "../../img/heart.png";

const Post = () => {
  const { currentUser, handleNoAva } = useContext(AuthContext);
  return (
    <div className="post">
      <div className="postContainer">
        <div className="user">
          {/* user info */}
          <div className="userInfo">
            <img
              src={
                currentUser.avatar
                  ? currentUser.avatar
                  : handleNoAva(currentUser)
              }
              alt=""
              className="postUserImg"
            />
            <div className="details">
              <span className="name">Minh Quan</span>
              <div className="status">
                <span className="date">1 min ago</span>
                <LockOutlinedIcon className="statusIcon" />
              </div>
            </div>
          </div>
          <div className="optionIcon">
            <MoreHorizIcon />
            <ClearIcon />
          </div>
        </div>

        {/* post content */}
        <div className="content">
          <p>description</p>
          <img
            src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/10/meme-hot-1.jpg"
            alt=""
            className="postImg"
          />
        </div>

        {/* info */}
        <div className="info">
          <div className="like">
            <img src={Like} alt="" className="reactionIcon"/>
            <img src={Heart} alt="" className="reactionIcon"/>
            <img src={Haha} alt="" className="reactionIcon"/>
            <div className="item">2 people</div>
          </div>

          <div className="commentShare">
            <div className="item">1 comment</div>
            <div className="item">1 share</div>
          </div>
        </div>
        <hr className="postLine" />
        {/* button */}
        <div className="buttons">
          <div className="item">
            <ThumbUpAltOutlinedIcon />
            <span>Like</span>
          </div>
          <div className="item">
            <CommentOutlinedIcon />
            <span>Comment</span>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
