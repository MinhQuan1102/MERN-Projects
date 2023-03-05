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
  reactPost,
  reactedPost,
  displayReact,
  displayReactCount,
  handleDisplayPostStatus,
  handleDisplayPostStatusIcon,
  handleUpdatePicture,
  handleDisplayTagTitle,
  handleReactPost
} from "../../longFunction";
import { useToast } from "@chakra-ui/react";
import EditPost from "../../editPost/EditPost";
import PostDetail from "../../postDetail/PostDetail";

const ProfilePost = ({ post, user, own, fetchPosts, timeline }) => {
  const { currentUser, handleNoAva, token } = useContext(AuthContext);
  const { like, haha, sad, wow, heart, angry } = post;
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
  const [openSelectAudience, setOpenSelectAudience] = useState(false);
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);
  const [isOpenPostStatus, setIsOpenPostStatus] = useState(false);
  const isPinned = post.isPinned;
  const [status, setStatus] = useState(handleDisplayPostStatus(post.status));
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editImage, setEditImage] = useState(post.images.length > 0);
  const [tagPeople, setTagPeople] = useState(false);
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  const postInitialStatus = post.status;
  const toast = useToast();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // useEffect(() => {
  //   const controller = new AbortController();
  //   fetchPosts();
  //   return () => {
  //     controller.abort();
  //   }
  // }, [reacted]);

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

      <PostContent post={post} user={user} />

      {likeCount > 0 && (
        <div className="postInfo">
          <div className={likeCount > 0 ? "likeComment" : "noLike"}>
            <div className="likeCount">
              <div className="reactIcons">
                {displayReactCount(like, heart, wow, haha, sad, angry)}
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
              {/* {post.comments.length > 0 && ( */}
                <p>0 comment</p>
              {/* // )} */}
              {post.shares.length > 0 && <p>{post.shares.length} share</p>}
            </div>
          </div>
        </div>
      )}

      {/* {postInfo ends} */}
      <div className="reactButtons">
        {!reacted ? (
          <div
            className="reactButton"
            onClick={() => handleReactPost(currentUser._id, post._id, "like", setReacted, setIsOpenReactIcons, config, toast)}
            onMouseOver={() => setIsOpenReactIcons(true)}
            onMouseLeave={() => setIsOpenReactIcons(false)}

          >
            {reactedPost(reacted)}
          </div>
        ) : (
          <div
            className="reactButton"
            onClick={() => handleReactPost(currentUser._id, post._id, "", setReacted, setIsOpenReactIcons, config, toast)}
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
            onClick={() => handleReactPost(currentUser._id, post._id, "like", setReacted, setIsOpenReactIcons, config, toast)}
          >
            <FontAwesomeIcon
              className="reactionIcon likeIcon"
              icon={faThumbsUp}
            />
          </div>
          <div
            className="reactIconShow heartIconBg"
            onClick={() => handleReactPost(currentUser._id, post._id, "heart", setReacted, setIsOpenReactIcons, config, toast)}
          >
            <FontAwesomeIcon className="reactionIcon likeIcon" icon={faHeart} />
          </div>
          <div
            className="reactIconShow hahaIconBg"
            onClick={() => handleReactPost(currentUser._id, post._id, "haha", setReacted, setIsOpenReactIcons, config, toast)}
          >
            <img src={Haha} alt="haha" />
          </div>
          <div
            className="reactIconShow wowIconBg"
            onClick={() => handleReactPost(currentUser._id, post._id, "wow", setReacted, setIsOpenReactIcons, config, toast)}
          >
            <img src={Wow} alt="wow" />
          </div>
          <div
            className="reactIconShow sadIconBg"
            onClick={() => handleReactPost(currentUser._id, post._id, "sad", setReacted, setIsOpenReactIcons, config, toast)}
          >
            <img src={Sad} alt="wow" />
          </div>
          <div
            className="reactIconShow angryIconBg"
            onClick={() => handleReactPost(currentUser._id, post._id, "angry", setReacted, setIsOpenReactIcons, config, toast)}
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
        <div className="reactButton">
          <p>
            <FontAwesomeIcon icon={faShare} className="reactButtonIcon" />
            <span>Share</span>
          </p>
        </div>
      </div>

      {/* {reactButtons ends} */}
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
          <input type="text" placeholder="Write a comment..." />
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
      {timeline &&
        !post.isUpdatingProfilePicture &&
        !post.isUpdatingCoverPicture &&
        isOpenPostDetail && (
          <PostDetail
            post={post}
            user={user}
            own={own}
            open={isOpenPostDetail}
            setOpen={setIsOpenPostDetail}
            fetchPost={fetchPosts}
            openSelectAudience={openSelectAudience}
            setOpenSelectAudience={setOpenSelectAudience}
          />
        )}
    </div>
  );
};

export default ProfilePost;
