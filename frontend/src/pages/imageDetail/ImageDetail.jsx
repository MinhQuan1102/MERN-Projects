import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

import "./imageDetail.css";
import ImageDetailPost from "../../components/ImageDetailPost/ImageDetailPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ImageDetail = () => {
  const history = useHistory();
  const postId = history.location.pathname.split("/")[2];
  const { currentUser, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  console.log(currentPicIndex)
  const handleClickNext = () => {
    setCurrentPicIndex((prev) => prev !== post.images.length - 1 ? prev + 1 : 0);
  };

  const handleClickPrev = () => {
    setCurrentPicIndex((prev) => prev !== 0 ? prev - 1 : post.images.length - 1);
  };
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/singlePost/${postId}`,
        config
      );
      setPost(response.data.post);
    } catch (error) {}
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${postId}`,
        config
      );
      setComments(response.data.comments);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  return (
    <div className="imageDetail">
      <Navbar />
      {post && (
        <div className="imageDetailContainer">
          <div className="imageDetailLeft">
            <div className="imageContainer">
              {post.images.length > 1 && (
                <div className="prevBtnContainer" onClick={handleClickPrev}>
                  <div className="prevBtn">
                    <FontAwesomeIcon icon={faChevronLeft} className="btnIcon" />
                  </div>
                </div>
              )}

              <div className="image">
                <img src={post.images[currentPicIndex]} alt="" />
              </div>
              {post.images.length > 1 && (
                <div className="nextBtnContainer" onClick={handleClickNext}>
                  <div className="nextBtn">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="btnIcon"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <ImageDetailPost
            post={post}
            comments={comments}
            setComments={setComments}
          />
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
