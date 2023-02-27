import React, { useContext, useState } from "react";
import "./updateCover.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
const UpdateAvatar = ({
  isUpdatingCover,
  setIsUpdatingCover,
  cover,
  setCover,
}) => {
  const toast = useToast();
  const { currentUser, token } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const cancelUpdate = () => {
    setIsUpdatingCover(false);
    setCover(null);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const updateAvatar = (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MQSocial");
      data.append("cloud_name", "dvvyj75uf");
      fetch("https://api.cloudinary.com/v1_1/dvvyj75uf/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const coverPicture = data.url.toString();
          return fetch(`http://localhost:5000/api/users/${currentUser._id}`, {
            method: "put",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: currentUser._id,
              coverPicture,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              return fetch(
                `http://localhost:5000/api/users/postImage/${currentUser._id}`,
                {
                  method: "put",
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    userId: currentUser._id,
                    newPhoto: coverPicture,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  const postImage = [coverPicture];
                  return fetch(`http://localhost:5000/api/posts`, {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      user: currentUser._id,
                      content: description,
                      images: postImage,
                      isUpdatingCoverPicture: true,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      cancelUpdate();
                      window.location.reload();
                    });
                });
            });
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  return (
    <div className={isUpdatingCover ? "updateCover" : "updateCover hide"}>
      <div className="header">
        <p>Update cover picture</p>
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={cancelUpdate}
        />
      </div>
      <div className="body">
        <input
          type="text"
          className="updateDesc"
          placeholder="Description"
          onChange={(e) => handleChange(e)}
        />
        <img src={URL.createObjectURL(cover)} alt="" className="newAvatar" />
      </div>
      <div className="audienceButtons">
        <button className="cancel" onClick={cancelUpdate}>
          Cancel
        </button>
        <button className="done" onClick={() => updateAvatar(cover)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateAvatar;
