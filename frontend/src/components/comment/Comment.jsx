import "./comment.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import { faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import { format } from "timeago.js";
import Sticker from "../../img/sticker.jpg";
import Gif from "../../img/gif.jpg";
import Haha from "../../img/haha.png";
import Wow from "../../img/wow.png";
import Sad from "../../img/sad.png";
import Angry from "../../img/angry.jpg";
import {
  reactedComment,
  displayReact,
  displayReactCommentCount,
  handleDisplayPostStatus,
  handleDisplayPostStatusIcon,
  handleUpdatePicture,
  handleDisplayTagTitle,
  handleReactComment,
  handleComment,
  fetchComments,
} from "../longFunction";
import SelectAudience from "../selectAudience/SelectAudience";
import PostContent from "../postContent/PostContent";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ReactDisplay from "../reactDisplay/ReactDisplay";

const Comment = ({ comment }) => {
  const { currentUser, token } = useContext(AuthContext);
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);

  const { like, haha, sad, wow, heart, angry } = comment;
  const likeCount =
    like.length +
    haha.length +
    sad.length +
    wow.length +
    heart.length +
    angry.length;
  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const commentRef = useRef();
  const commentReactDisplay = useRef();
  const commentWidth = commentRef.current?.offsetWidth;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const toast = useToast();

  return (
    <div className="comment">
      <div className="singleComment" key={comment._id}>
        <div className="commentUserAva">
          <img src={comment.user.avatar} alt="" />
        </div>
        <div className="commentDetail" ref={commentRef}>
          <div className="commentInfo">
            <h2 className="commentUsername">{comment.user.fullName}</h2>
            <span>{comment.content}</span>
            <div
              className="commentReactDisplay"
              ref={commentReactDisplay}
              style={{
                bottom: commentWidth < 220 && "0px",
                right: commentWidth < 220 && "-15px",
              }}
            >
              {displayReactCommentCount(like, heart, wow, haha, sad, angry)}
            </div>
          </div>

          <div className="reactComment">
            {!reacted ? (
              <span
                className="commentLike"
                onMouseOver={() => setIsOpenReactIcons(true)}
                onMouseLeave={() => setIsOpenReactIcons(false)}
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "like",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                {reactedComment(reacted)}
              </span>
            ) : (
              <span
                className="commentLike"
                onMouseOver={() => setIsOpenReactIcons(true)}
                onMouseLeave={() => setIsOpenReactIcons(false)}
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                {reactedComment(reacted)}
              </span>
            )}

            <span className="commentReply">Reply</span>
            <span className="commentTimeAgo">{format(comment.createdAt)}</span>
            <div
              className={
                isOpenReactIcons ? "commentReactions" : "commentReactionsHide"
              }
              onMouseOver={() => setIsOpenReactIcons(true)}
              onMouseLeave={() => setIsOpenReactIcons(false)}
            >
              <div
                className="reactIconShow likeIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "like",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <FontAwesomeIcon
                  className="reactionIcon likeIcon"
                  icon={faThumbsUp}
                />
              </div>
              <div
                className="reactIconShow heartIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "heart",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <FontAwesomeIcon
                  className="reactionIcon likeIcon"
                  icon={faHeart}
                />
              </div>
              <div
                className="reactIconShow hahaIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "haha",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <img src={Haha} alt="haha" />
              </div>
              <div
                className="reactIconShow wowIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "wow",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <img src={Wow} alt="wow" />
              </div>
              <div
                className="reactIconShow sadIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "sad",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <img src={Sad} alt="wow" />
              </div>
              <div
                className="reactIconShow angryIconBg"
                onClick={() =>
                  handleReactComment(
                    currentUser._id,
                    comment._id,
                    "angry",
                    setReacted,
                    setIsOpenReactIcons,
                    config,
                    toast
                  )
                }
              >
                <img src={Angry} alt="wow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
