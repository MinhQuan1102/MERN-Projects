import React, { useContext, useState, useEffect } from "react";
import {
  faFlag,
  faImages,
  faLaugh,
  faUserTag,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profileShare.css";
import { AuthContext } from "../../../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import CreatePost from "../../createPost/CreatePost";
import axios from "axios";

const ProfileShare = ({ user, own }) => {
  const { currentUser, handleNoAva, token, setBlur } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [tagPeople, setTagPeople] = useState(false);
  const toast = useToast();
  
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleChange = (e) => {
    setContent(e.target.value);
    setBlur(true);
  };

  const handleOpenEditImage = () => {
    setIsCreatingPost(true);
    setEditImage(true);
    setBlur(true);
  }

  const handleOpenTagPeople = () => {
    setIsCreatingPost(true);
    setTagPeople(true);
    setBlur(true);
  }

  const uploadPost = async (e) => {
    if (e.key === "Enter") {
      try {
        if (!content)
          return toast({
            title: "Please type something...!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        const response = await axios.post(
          `http://localhost:5000/api/posts`,
          {
            user: currentUser._id,
            content,
          },
          config
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        return toast({
          title: "An error occured!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const handleClick = () => {
    setIsCreatingPost(true);
    setBlur(true);
  }

  return (
    <div className="profileShare">
      {user && (
        <div className="profileShareContainer">
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
                  onClick={handleClick}
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Write something to ${user.firstName}...`}
                  className="uploadInput"
                  onClick={handleClick}
                />
              )}
            </div>
          </div>
          {isCreatingPost && (
            <CreatePost
              setIsCreatingPost={setIsCreatingPost}
              own={own}
              user={user}
              setBlur={setBlur}
              editImage={editImage}
              setEditImage={setEditImage}
              tagPeople={tagPeople}
              setTagPeople={setTagPeople}
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
                    icon={faFlag}
                    className="uploadIcon uploadEvent"
                  />
                  Life Event
                </p>
              </div>
            </div>
          ) : (
            <div className="photoUpload">
              <div className="uploadItem" onClick={handleOpenEditImage}>
                <p>
                  <FontAwesomeIcon
                    icon={faImages}
                    className="uploadIcon uploadVideo notOwn"
                  />
                  Photo/Video
                </p>
              </div>
              <div className="uploadItem" onClick={handleOpenTagPeople}>
                <p>
                  <FontAwesomeIcon
                    icon={faUserTag}
                    className="uploadIcon uploadPhoto tagPeople"
                  />
                  Tag people
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
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileShare;
