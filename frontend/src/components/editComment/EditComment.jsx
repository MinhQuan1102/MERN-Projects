import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  faCamera,
  faCommentAlt,
  faEllipsisH,
  faGrinAlt,
  faHeart,
  faShare,
  faThumbsUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import { format } from "timeago.js";
import Sticker from "../../img/sticker.jpg";
import Gif from "../../img/gif.jpg";
import { handleEditComment } from "../longFunction";
import "./editComment.css";

const EditComment = ({
  comment,
  open,
  post,
  setComments,
  setIsEditingComment,
  replyComment,
}) => {
  const { currentUser, handleNoAva, token } = useContext(AuthContext);
  const [commentText, setCommentText] = useState(comment.content);
  const [images, setImages] = useState([]);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const toast = useToast();

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div
      className={"editComment"}
      style={{ padding: !replyComment && "10px 10px 0 20px" }}
    >
      <div
        className="commentProfilePicture"
        style={{ width: !replyComment && "36px", height: !replyComment && "36px" }}
      >
        <img
          src={
            currentUser.avatar ? currentUser.avatar : handleNoAva(currentUser)
          }
          alt=""
        />
      </div>
      <div className="editCommentRight">
        <div className="commentText">
          <input
            type="text"
            value={commentText}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) =>
              handleEditComment(
                e,
                setIsEditingComment,
                post,
                currentUser,
                commentText,
                images,
                comment,
                setComments,
                setCommentText,
                setImages,
                config,
                toast
              )
            }
          />
          <div className="commentIcons" style={{ top: !replyComment && "40%"}}>
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
        <div className="escText">
          <span>
            Press Esc to <span className="cancelText" onClick={() => setIsEditingComment(false)}>cancel</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
