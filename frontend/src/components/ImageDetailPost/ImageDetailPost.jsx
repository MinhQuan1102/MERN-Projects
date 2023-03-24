import { useState, useContext } from "react";
import "./imageDetailPost.css";
import { format } from "timeago.js";
import {
  handleDisplayPostStatusIcon,
  handleUpdatePicture,
  handleDisplayTagTitle,
  displayReact,
  displayReactCount,
  handleReactPost,
  reactedPost,
  handleComment,
} from "../../components/longFunction";
import Sticker from "../../img/sticker.jpg";
import Gif from "../../img/gif.jpg";
import Haha from "../../img/haha.png";
import Wow from "../../img/wow.png";
import Sad from "../../img/sad.png";
import Angry from "../../img/angry.jpg";
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
import { AuthContext } from "../../context/AuthContext";
import PostContent from "../postContent/PostContent";
import ShareOptions from "../shareOptions/ShareOptions";
import Comment from "../comment/Comment";
import ReactDisplay from "../reactDisplay/ReactDisplay";
import { useToast } from "@chakra-ui/react";
const ImageDetailPost = ({ post, comments, setComments }) => {
  const { currentUser, token, handleNoAva } = useContext(AuthContext);
  const [selectedType, setSelectedType] = useState("all");
  const [openShareOptions, setOpenShareOptions] = useState(false);
  const [isOpenReactIcons, setIsOpenReactIcons] = useState(false);
  const [isOpenReactDisplay, setIsOpenReactDisplay] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [images, setImages] = useState([]);
  const { react, like, haha, sad, wow, heart, angry } = post;
  const likeCount = react.length;
  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const totalComments = comments
    .map((comment) => comment.replies.length + 1)
    .reduce((acc, val) => acc + val, 0);

  const toast = useToast();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSeeReact = (selectedType) => {
    setIsOpenReactDisplay(true);
    setSelectedType(selectedType);
  };

  return (
    <div className="imageDetailRight">
      <div className="imagePostInfo">
        <div className="profilePostLeft">
          <div className="profilePostImg">
            <img
              src={post.sender ? post.sender.avatar : post.user.avatar}
              alt=""
            />
          </div>
          <div className="profilePostInfo">
            {(post.isUpdatingProfilePicture || post.isUpdatingCoverPicture) &&
              handleUpdatePicture(post, post.user)}
            {!post.isUpdatingProfilePicture &&
              !post.isUpdatingCoverPicture &&
              handleDisplayTagTitle(post.user, post.taggedFriends)}
            <div className="postStatus">
              <span className="dayAgo">{format(post.createdAt)}</span>
              {"•"}
              <span>{handleDisplayPostStatusIcon(post.status)}</span>
            </div>
          </div>
        </div>
        <div className="profilePostRight">
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="editPostStatusIcon"
            // onClick={() => setIsOpenPostStatus(!isOpenPostStatus)}
          />
        </div>
      </div>
      <span className="postContent">{post.content}</span>
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
        <div className="reactButton">
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
      <div className="commentSection">
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment._id}
              setComments={setComments}
              detail={true}
            />
          ))}
      </div>
      <div className="commentSite">
        <div className="commentSiteContainer">
          <div className="commentProfilePicture">
            <img
              src={
                currentUser.avatar
                  ? currentUser.avatar
                  : handleNoAva(currentUser)
              }
              alt=""
            />
          </div>
          <div className="commentText">
            <input
              type="text"
              placeholder="Write a comment..."
              onChange={(e) => handleChange(e)}
              value={commentText}
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
      </div>
      <ReactDisplay
        post={post}
        open={isOpenReactDisplay}
        setOpen={setIsOpenReactDisplay}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </div>
  );
};

export default ImageDetailPost;
