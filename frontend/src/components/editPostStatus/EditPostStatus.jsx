import { useToast } from "@chakra-ui/react";
import {
  faComment,
  faCommentAlt,
  faGlobeEurope,
  faLink,
  faLinkSlash,
  faMapPin,
  faPen,
  faSquareMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useRef, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./editPostStatus.css";
import { pinPost, unpinPost, deletePost } from "../longFunction";

const EditPostStatus = ({
  open,
  setOpen,
  isPinned,
  post,
  setOpenSelectAudience,
  setIsEditingPost,
}) => {
  const editPostStatus = useRef();
  const { currentUser, token } = useContext(AuthContext);
  const toast = useToast();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleOpenEditPost = () => {
    setOpen(false);
    setIsEditingPost(true);
  };

  const handleOpenSelectAudience = () => {
    setOpen(false);
    setOpenSelectAudience(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        editPostStatus.current &&
        !editPostStatus.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editPostStatus]);

  return (
    <div
      className={open ? "editPostStatus" : "editPostStatus hide"}
      ref={editPostStatus}
    >
      <ul>
        {isPinned ? (
          <li onClick={() => unpinPost(currentUser._id, post, config, toast)}>
            <FontAwesomeIcon icon={faLinkSlash} className="editStatusIcon" />
            <p>Unpin post</p>
          </li>
        ) : (
          <li onClick={() => pinPost(currentUser._id, post, config, toast)}>
            <FontAwesomeIcon icon={faLink} className="editStatusIcon" />
            <p>Pin post</p>
          </li>
        )}
        {!(post.isUpdatingProfilePicture || post.isUpdatingCoverPicture) && (
          <li onClick={handleOpenEditPost}>
            <FontAwesomeIcon icon={faPen} className="editStatusIcon" />
            <p>Edit post</p>
          </li>
        )}

        <li onClick={handleOpenSelectAudience}>
          <FontAwesomeIcon icon={faGlobeEurope} className="editStatusIcon" />
          <p>Edit audience</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faSquareMinus} className="editStatusIcon" />
          <p>Hide from profile</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faComment} className="editStatusIcon" />
          <p>Who can comment on your post?</p>
        </li>
        <li onClick={() => deletePost(post._id, config, toast)}>
          <FontAwesomeIcon icon={faTimes} className="editStatusIcon" />
          <p>Delete post</p>
        </li>
      </ul>
    </div>
  );
};

export default EditPostStatus;
