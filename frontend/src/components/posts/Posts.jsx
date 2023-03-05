import { useState, useEffect, useContext } from "react";
import ProfileSetup from "../profile/profileSetup/ProfileSetup";
import ProfileShare from "../profile/profileShare/ProfileShare";
import ProfilePost from "../profile/profilePost/ProfilePost";
import "./posts.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "@chakra-ui/react";

const Posts = () => {
  const path = useHistory().location.pathname;
  const { currentUser, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const toast = useToast();
  const history = useHistory();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTimelinePosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/timeline/${currentUser._id}`,
        config
      );
      setPosts(response.data.posts);
    } catch (error) {
      toast({
        title: "An error occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTimelinePosts();
    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div className="posts">
      {posts &&
        posts.map((post) => (
          <ProfilePost
            post={post}
            user={post.user}
            own={post.user._id === currentUser._id}
            fetchPosts={fetchTimelinePosts}
            timeline={true}
            key={post._id}
          />
        ))}
      {/* <ProfilePost/>
      <ProfilePost/>
      <ProfilePost/> */}
    </div>
  );
};

export default Posts;
