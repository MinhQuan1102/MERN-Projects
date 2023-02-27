import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import {
  faFlag,
  faImages,
  faLaugh,
  faUserTag,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePost from "../createPost/CreatePost";

const Share = ({ user, own }) => {
  const { currentUser, handleNoAva, token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [blur, setBlur] = useState(false)
  const [editImage, setEditImage] = useState(false);
  const [content, setContent] = useState("");
  const toast = useToast();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleChange = (e) => {
    setContent(e.target.value);
    
  };

  const handleOpenCreatePost = () => {
    setIsCreatingPost(true);
    setBlur(true);
  }

  const handleOpenEditImage = () => {
    setIsCreatingPost(true);
    setEditImage(true);
    setBlur(true);
  }

  return (
    <div className="share">
      {user && (
        <div className="shareContainer">
          <div className="uploadPost">
            <div className="uploadImage">
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : handleNoAva(currentUser)
                }
                alt=""
              />
            </div>
            <div className="uploadText">
              {own ? (
                <input
                  type="text"
                  placeholder={`What's on your mind, ${user.firstName}?`}
                  className="uploadInput"
                  onClick={handleOpenCreatePost}
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Write something to ${user.firstName}...`}
                  className="uploadInput"
                  onClick={handleOpenCreatePost}
                />
              )}
            </div>
          </div>
          {isCreatingPost && (
            <CreatePost
              isCreatingPost={isCreatingPost}
              setIsCreatingPost={setIsCreatingPost}
              own={own}
              user={user}
              setBlur={setBlur}
              editImage={editImage}
              setEditImage={setEditImage}
            />
          )}
          {own ? (
            <div className="photoUpload">
              <div className="uploadItem">
                <p>
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="uploadIcon uploadVideo"
                  />
                  Live Video
                </p>
              </div>
              <div className="uploadItem" onClick={handleOpenEditImage}>
                <p>
                  <FontAwesomeIcon
                    icon={faImages}
                    className="uploadIcon uploadPhoto"
                  />
                  Photo/Video
                </p>
              </div>
              <div className="uploadItem">
                <p>
                  <FontAwesomeIcon
                    icon={faLaugh}
                    className="uploadIcon feeling"
                  />
                  Feeling/Activity
                </p>
              </div>
            </div>
          ) : (
            <div className="photoUpload">
              <div className="uploadItem">
                <p>
                  <FontAwesomeIcon
                    icon={faImages}
                    className="uploadIcon uploadVideo notOwn"
                  />{" "}
                  Photo/Video
                </p>
              </div>
              <div className="uploadItem ">
                <p>
                  <FontAwesomeIcon
                    icon={faUserTag}
                    className="uploadIcon uploadPhoto tagPeople"
                  />{" "}
                  Tag people
                </p>
              </div>
              <div className="uploadItem">
                <p>
                  <FontAwesomeIcon
                    icon={faLaugh}
                    className="uploadIcon feeling"
                  />{" "}
                  Feeling/Activity
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Share;
