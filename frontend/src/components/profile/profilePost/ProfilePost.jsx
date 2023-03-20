import {
  faCamera,
  faCommentAlt,
  faEllipsisH,
  faGrinAlt,
  faHeart,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import Sticker from "../../../img/sticker.jpg";
import Gif from "../../../img/gif.jpg";
import Like from "../../../img/like.png";
import Heart from "../../../img/heart.png";
import Haha from "../../../img/haha.png";
import Wow from "../../../img/wow.png";
import Sad from "../../../img/sad.png";
import Angry from "../../../img/angry.jpg";
import "./profilePost.css";
import SelectAudience from "../../selectAudience/SelectAudience";
import PostContent from "../../postContent/PostContent";
import EditPostStatus from "../../editPostStatus/EditPostStatus";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import {
  fetchComments,
  reactedPost,
  displayReact,
  displayReactCount,
  handleDisplayPostStatus,
  handleDisplayPostStatusIcon,
  handleUpdatePicture,
  handleDisplayTagTitle,
  handleReactPost,
  handleComment,
} from "../../longFunction";
import { useToast } from "@chakra-ui/react";
import EditPost from "../../editPost/EditPost";
import PostDetail from "../../postDetail/PostDetail";
import Comment from "../../comment/Comment";
import ReactDisplay from "../../reactDisplay/ReactDisplay";
import ShareOptions from "../../shareOptions/ShareOptions";
import ImageDetail from "../../imageDetail/ImageDetail";

const ProfilePost = ({ post, user, own, fetchPosts, timeline }) => {
  const { currentUser, handleNoAva, token } = useContext(AuthContext);
  const { react, like, haha, sad, wow, heart, angry } = post;
  const likeCount = react.length;
  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const [openSelectAudience, setOpenSelectAudience] = useState(false);
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);
  const [isOpenPostStatus, setIsOpenPostStatus] = useState(false);
  const [isOpenReactDisplay, setIsOpenReactDisplay] = useState(false);
  const [openImageDetail, setOpenImageDetail] = useState(false);
  const isPinned = post.isPinned;
  const [status, setStatus] = useState(handleDisplayPostStatus(post.status));
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editImage, setEditImage] = useState(post.images.length > 0);
  const [tagPeople, setTagPeople] = useState(false);
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  const [openShareOptions, setOpenShareOptions] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [commentText, setCommentText] = useState("");
  const [images, setImages] = useState([]);
  const postInitialStatus = post.status;
  const toast = useToast();

  const totalComments = comments
    .map((comment) => comment.replies.length + 1)
    .reduce((acc, val) => acc + val, 0);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSeeReact = (selectedType) => {
    setIsOpenReactDisplay(true);
    setSelectedType(selectedType);
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };
  useEffect(() => {
    fetchComments(post._id, setComments, config, toast);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts();
    return () => {
      controller.abort();
    };
  }, [reacted]);

  const handleUpdateAudience = async (status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/update/${post._id}`,
        { status: status },
        config
      );
      window.location.reload();
    } catch (error) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setIsOpenReactIcons(false);
      return;
    }
  };
  return (
    <div className={!timeline ? "profilePost" : "timeline"}>
      <div className="profilePostContainer">
        <div className="profilePostLeft">
          <div className="profilePostImg">
            <img src={post.sender ? post.sender.avatar : user.avatar} alt="" />
          </div>
          <div className="profilePostInfo">
            {(post.isUpdatingProfilePicture || post.isUpdatingCoverPicture) &&
              handleUpdatePicture(post, user)}
            {!post.isUpdatingProfilePicture &&
              !post.isUpdatingCoverPicture &&
              handleDisplayTagTitle(user.fullName, post.taggedFriends)}
            <div className="postStatus">
              <span className="dayAgo">{format(post.createdAt)}</span>
              {"•"}
              <span>
                {handleDisplayPostStatusIcon(
                  post.status,
                  setOpenSelectAudience
                )}
              </span>
            </div>
          </div>
        </div>
        <SelectAudience
          open={openSelectAudience}
          setOpen={setOpenSelectAudience}
          post={post}
          status={status}
          setStatus={setStatus}
          handleUpdateAudience={handleUpdateAudience}
          initialStatus={postInitialStatus}
          fetchPosts={fetchPosts}
        />
        {/* post status ends */}
        {own && (
          <div className="profilePostRight">
            <FontAwesomeIcon
              icon={faEllipsisH}
              className="editPostStatusIcon"
              onClick={() => setIsOpenPostStatus(true)}
            />
          </div>
        )}
      </div>

      <PostContent
        post={post}
        user={user}
        setOpenImageDetail={setOpenImageDetail}
      />

      {likeCount > 0 && (
        <div className="postInfo">
          <div className={likeCount > 0 ? "likeComment" : "noLike"}>
            <div className="likeCount">
              <div className="reactIcons">
                {displayReactCount(
                  like,
                  heart,
                  wow,
                  haha,
                  sad,
                  angry,
                  handleSeeReact
                )}
              </div>

              <div className="">
                <p className="count">
                  {!reacted && likeCount > 0 && <span>{likeCount}</span>}
                  {reacted && likeCount > 1 && (
                    <span>{`You and ${likeCount - 1} ${
                      likeCount > 2 ? "others" : "other"
                    }`}</span>
                  )}
                  {reacted && likeCount === 1 && (
                    <span>{currentUser.fullName}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="commentShareSite">
              {comments.length > 0 && (
                <p>{`${totalComments} comment${
                  totalComments > 1 ? "s" : ""
                }`}</p>
              )}
              {post.shares.length > 0 && <p>{post.shares.length} share</p>}
            </div>
          </div>
        </div>
      )}

      {/* {postInfo ends} */}
      <div
        className="reactButtons"
        style={{
          borderBottom: comments.length > 0 && "1px solid #3333",
          borderTop: post.sharedPost && likeCount === 0 && "none",
        }}
      >
        {!reacted ? (
          <div
            className="reactButton"
            onClick={() =>
              handleReactPost(
                currentUser._id,
                post._id,
                "like",
                setReacted,
                setIsOpenReactIcons,
                config,
                toast
              )
            }
            onMouseOver={() => setIsOpenReactIcons(true)}
            onMouseLeave={() => setIsOpenReactIcons(false)}
          >
            {reactedPost(reacted)}
          </div>
        ) : (
          <div
            className="reactButton"
            onClick={() =>
              handleReactPost(
                currentUser._id,
                post._id,
                "",
                setReacted,
                setIsOpenReactIcons,
                config,
                toast
              )
            }
            onMouseOver={() => setIsOpenReactIcons(true)}
            onMouseOut={() => setIsOpenReactIcons(false)}
          >
            {reactedPost(reacted)}
          </div>
        )}
        <div
          className={isOpenReactIcons ? "reactions" : "reactionsHide"}
          onMouseOver={() => setIsOpenReactIcons(true)}
          onMouseOut={() => setIsOpenReactIcons(false)}
        >
          <div
            className="reactIconShow likeIconBg"
            onClick={() =>
              handleReactPost(
                currentUser._id,
                post._id,
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
              handleReactPost(
                currentUser._id,
                post._id,
                "heart",
                setReacted,
                setIsOpenReactIcons,
                config,
                toast
              )
            }
          >
            <FontAwesomeIcon className="reactionIcon likeIcon" icon={faHeart} />
          </div>
          <div
            className="reactIconShow hahaIconBg"
            onClick={() =>
              handleReactPost(
                currentUser._id,
                post._id,
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
              handleReactPost(
                currentUser._id,
                post._id,
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
              handleReactPost(
                currentUser._id,
                post._id,
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
              handleReactPost(
                currentUser._id,
                post._id,
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
        <div className="reactButton" onClick={() => setIsOpenPostDetail(true)}>
          <p>
            <FontAwesomeIcon icon={faCommentAlt} className="reactButtonIcon" />
            <span>Comment</span>
          </p>
        </div>
        <div
          className="reactButton"
          style={{ position: "relative" }}
          onClick={() => setOpenShareOptions(!openShareOptions)}
        >
          <p>
            <FontAwesomeIcon icon={faShare} className="reactButtonIcon" />
            <span>Share</span>
          </p>
          {openShareOptions && <ShareOptions />}
        </div>
      </div>

      {comments.length > 0 && (
        <div className="commentSection">
          {comments.length > 1 && (
            <div
              className="viewMoreComments"
              onClick={() => setIsOpenPostDetail(true)}
            >
              <span>View more comments</span>
            </div>
          )}
          {comments.length > 0 && (
            <>
              <Comment
                post={post}
                comment={comments[0]}
                fetchComments={fetchComments}
                detail={false}
              />
            </>
          )}
        </div>
      )}

      <div className="commentSite">
        <div className="commentProfilePicture">
          <img
            src={
              currentUser.avatar ? currentUser.avatar : handleNoAva(currentUser)
            }
            alt=""
          />
        </div>
        <div className="commentText">
          <input
            type="text"
            value={commentText}
            placeholder="Write a comment..."
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) =>
              handleComment(
                e,
                post,
                currentUser,
                commentText,
                setCommentText,
                images,
                setImages,
                setComments,
                config,
                toast
              )
            }
          />
          <div className="commentIcons">
            <div className="commentItem">
              <FontAwesomeIcon icon={faGrinAlt} className="commentIcon" />
            </div>
            <div className="commentItem">
              <FontAwesomeIcon icon={faCamera} className="commentIcon" />
            </div>
            <div className="commentItem">
              <img src={Sticker} className="commentIcon" />
            </div>
            <div className="commentItem">
              <img src={Gif} className="commentIcon" />
            </div>
          </div>
        </div>
      </div>
      <EditPostStatus
        open={isOpenPostStatus}
        setOpen={setIsOpenPostStatus}
        isPinned={isPinned}
        post={post}
        setOpenSelectAudience={setOpenSelectAudience}
        setIsEditingPost={setIsEditingPost}
      />
      {isEditingPost && (
        <EditPost
          setOpen={setIsEditingPost}
          post={post}
          editImage={editImage}
          setEditImage={setEditImage}
          tagPeople={tagPeople}
          setTagPeople={setTagPeople}
        />
      )}
      {!post.isUpdatingProfilePicture &&
        !post.isUpdatingCoverPicture &&
        isOpenPostDetail && (
          <PostDetail
            post={post}
            user={user}
            own={own}
            totalComments={totalComments}
            open={isOpenPostDetail}
            setOpen={setIsOpenPostDetail}
            fetchPost={fetchPosts}
            openSelectAudience={openSelectAudience}
            setOpenSelectAudience={setOpenSelectAudience}
            setSelectedType={setSelectedType}
            setIsOpenReactDisplay={setIsOpenReactDisplay}
          />
        )}
      <ReactDisplay
        post={post}
        open={isOpenReactDisplay}
        setOpen={setIsOpenReactDisplay}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {openImageDetail && (
        <ImageDetail
          post={post}
          open={openImageDetail}
          setOpen={setOpenImageDetail}
        />
      )}
    </div>
  );
};

export default ProfilePost;
