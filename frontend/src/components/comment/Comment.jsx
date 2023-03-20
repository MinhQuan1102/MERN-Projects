import "./comment.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  faArrowRight,
  faEllipsisH,
  faHeart,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import { format } from "timeago.js";
import Haha from "../../img/haha.png";
import Wow from "../../img/wow.png";
import Sad from "../../img/sad.png";
import Angry from "../../img/angry.jpg";
import {
  reactedComment,
  displayReact,
  displayReactCommentCount,
  handleReactComment,
  handleDeleteComment,
  handleEditComment,
} from "../longFunction";
import { AuthContext } from "../../context/AuthContext";
import ReplyCommentInput from "../replyCommentInput/ReplyCommentInput";
import ReplyComment from "../replyComment/ReplyComment";
import EditComment from "../editComment/EditComment";

const Comment = ({ comment, post, setComments, detail }) => {
  const { currentUser, token } = useContext(AuthContext);
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);
  const { like, haha, sad, wow, heart, angry } = comment;
  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const [openReplyCommentInput, setOpenReplyCommentInput] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const [openCommentOptions, setOpenCommentOptions] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isEditingReplyComment, setIsEditingReplyComment] = useState(false);
  const commentTextRef = useRef();
  const commentReactDisplay = useRef();
  const commentOptionsRef = useRef();
  const commentWidth = commentTextRef.current?.offsetWidth;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const toast = useToast();

  const handleOpenEditComment = () => {
    setIsEditingComment(true);
    setOpenCommentOptions(false);
  };
  // useEffect(() => {
  //   fetchComments()
  // }, [reacted])

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
    <div className="comment">
      <div className="singleComment" key={comment._id}>
        {!isEditingComment ? (
          <div
            className="commentContent"
            onMouseOver={() => setOpenEditComment(true)}
            onMouseLeave={() => setOpenEditComment(false)}
          >
            <div className="commentUserAva">
              <img src={comment.user.avatar} alt="" />
            </div>
            <div className="commentDetail" ref={commentTextRef}>
              <div className="commentInfoWrapper">
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
                    {displayReactCommentCount(
                      like,
                      heart,
                      wow,
                      haha,
                      sad,
                      angry
                    )}
                  </div>
                </div>
                <div className="commentOptionsSection">
                  {(openEditComment || openCommentOptions) && (
                    <>
                      <div
                        className="commentOptionsContainer"
                        onClick={() =>
                          setOpenCommentOptions(!openCommentOptions)
                        }
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

                <span
                  className="commentReply"
                  onClick={() =>
                    setOpenReplyCommentInput(!openReplyCommentInput)
                  }
                >
                  Reply
                </span>
                <span className="commentTimeAgo">
                  {format(comment.createdAt)}
                </span>
                <div
                  className={
                    isOpenReactIcons
                      ? "commentReactions"
                      : "commentReactionsHide"
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
        ) : (
          <EditComment
            comment={comment}
            open={true}
            post={post}
            setComments={setComments}
            setIsEditingComment={setIsEditingComment}
            replyComment={false}
          />
        )}

        <div className="replyCommentSection">
          {detail && openReplyComments ? (
            <div className="replyComments">
              {comment.replies.map((replyComment) => (
                <ReplyComment
                  key={replyComment._id}
                  comment={replyComment}
                  post={post}
                  setComments={setComments}
                  isEditingComment={isEditingReplyComment}
                />
              ))}
            </div>
          ) : (
            <div className="viewAllReplies" onClick={() => setOpenReplyComments(true)}>
              <FontAwesomeIcon icon={faArrowRight} />
              <span>{`${comment.replies.length} replies`}</span>
            </div>
          )}

          <ReplyCommentInput
            open={openReplyCommentInput}
            comment={comment}
            post={post}
            setComments={setComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
