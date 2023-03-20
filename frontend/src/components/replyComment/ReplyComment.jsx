import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  reactedComment,
  displayReact,
  displayReactCommentCount,
  handleReactComment,
  handleComment,
  fetchComments,
  handleDeleteComment,
} from "../longFunction";
import { format } from "timeago.js";
import {
  faHeart,
  faThumbsUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Haha from "../../img/haha.png";
import Wow from "../../img/wow.png";
import Sad from "../../img/sad.png";
import Angry from "../../img/angry.jpg";
import "./replyComment.css";
import { useToast } from "@chakra-ui/react";
import ReplyCommentInput from "../replyCommentInput/ReplyCommentInput";
import EditComment from "../editComment/EditComment";

const ReplyComment = ({ comment, post, setComments }) => {
  const { currentUser, token } = useContext(AuthContext);
  const { like, haha, sad, wow, heart, angry } = comment;

  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const commentRef = useRef();
  const commentReactDisplay = useRef();
  const [isEditingComment, setIsEditingComment] = useState(false);
  const commentWidth = commentRef.current?.offsetWidth;
  const toast = useToast();
  const commentOptionsRef = useRef();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleOpenEditComment = () => {
    setIsEditingComment(true);
    setOpenCommentOptions(false);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        commentOptionsRef.current &&
        !commentOptionsRef.current.contains(event.target)
      ) {
        setOpenCommentOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentOptionsRef]);

  return (
    <div
      className="replyComment"
      onMouseOver={() => setOpenEditComment(true)}
      onMouseLeave={() => setOpenEditComment(false)}
    >
      {!isEditingComment ? (
        <>
          <div className="replyCommentLeft">
            <img src={comment.user.avatar} alt="" />
          </div>
          <div className="replyCommentRight" ref={commentRef}>
            <div className="replyCommentInfoWrapper">
              <div className="replyCommentInfo">
                <h2>{comment.user.fullName}</h2>
                <span>{comment.content}</span>
                <div
                  className="commentReactDisplay"
                  ref={commentReactDisplay}
                  style={{
                    bottom: commentWidth < 220 && "-15px",
                    right: commentWidth < 220 && "0px",
                  }}
                >
                  {displayReactCommentCount(like, heart, wow, haha, sad, angry)}
                </div>
              </div>
              <div className="commentOptionsSection">
                {(openEditComment || openCommentOptions) && (
                  <>
                    <div
                      className="commentOptionsContainer"
                      onClick={() => setOpenCommentOptions(!openCommentOptions)}
                    >
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                  </>
                )}
                {openCommentOptions && (
                  <div className="commentOptions" ref={commentOptionsRef}>
                    <ul>
                      {currentUser._id === comment.user._id && (
                        <li onClick={handleOpenEditComment}>Edit comment</li>
                      )}
                      <li
                        onClick={() =>
                          handleDeleteComment(
                            comment._id,
                            setOpenCommentOptions,
                            post,
                            setComments,
                            config,
                            toast
                          )
                        }
                      >
                        Delete comment
                      </li>
                    </ul>
                  </div>
                )}
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
              <span className="commentTimeAgo">
                {format(comment.createdAt)}
              </span>
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
        </>
      ) : (
        <>
          <EditComment
            comment={comment}
            open={true}
            post={post}
            setComments={setComments}
            setIsEditingComment={setIsEditingComment}
            replyComment={true}
          />
        </>
      )}
    </div>
  );
};

export default ReplyComment;
