import { useState, useContext } from "react";
import "./imageDetailPost.css";
import { format } from "timeago.js";
import {
  handleDisplayPostStatusIcon,
  handleUpdatePicture,
  handleDisplayTagTitle,
  displayReact,
  displayReactCount,
} from "../../components/longFunction";
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

const ImageDetailPost = ({ post, comments }) => {
  const { currentUser } = useContext(AuthContext);
  const [selectedType, setSelectedType] = useState("all");
  const [isOpenReactDisplay, setIsOpenReactDisplay] = useState(false);
  const { react, like, haha, sad, wow, heart, angry } = post;
  const likeCount = react.length;
  const [reacted, setReacted] = useState(
    displayReact(like, heart, wow, haha, sad, angry, currentUser._id)
  );
  const totalComments = comments
    .map((comment) => comment.replies.length + 1)
    .reduce((acc, val) => acc + val, 0);

    console.log(comments)

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
              handleDisplayTagTitle(post.user.fullName, post.taggedFriends)}
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
    </div>
  );
};

export default ImageDetailPost;
