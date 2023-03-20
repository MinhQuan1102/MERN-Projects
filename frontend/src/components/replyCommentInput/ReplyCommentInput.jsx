import "./replyCommentInput.css";
import React, { useState, useContext, useEffect, useRef } from "react";
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
import {
  handleReplyComment,
} from "../longFunction";
import { AuthContext } from "../../context/AuthContext";

const ReplyCommentInput = ({ comment, open, post, setComments }) => {
  const { currentUser, token, handleNoAva } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [images, setImages] = useState([]);
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

  return (
    <div className={open ? "replyCommentInput" : "replyCommentInput hide"}>
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
          placeholder={`Reply to ${comment.user.fullName}...`}
          onChange={(e) => handleChange(e)}
          value={commentText}
          onKeyDown={(e) =>
            handleReplyComment(
              e,
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
  );
};

export default ReplyCommentInput;
