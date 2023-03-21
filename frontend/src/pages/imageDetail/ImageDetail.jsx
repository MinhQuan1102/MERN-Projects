import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

import "./imageDetail.css";
import ImageDetailPost from "../../components/ImageDetailPost/ImageDetailPost";

const ImageDetail = () => {
  const history = useHistory();
  const postId = history.location.pathname.split("/")[2];
  const { currentUser, token } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([])
  console.log(post)
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
      const response = await axios.get(`http://localhost:5000/api/comments/${postId}`, config)
      setComments(response.data.comments)

    } catch (error) {
      
    }
  }

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
              <img src={post.images[0]} alt="" />
            </div>
          </div>
          <ImageDetailPost post={post} comments={comments}/>
        </div>
      )}
    </div>
  );
};

export default ImageDetail;
