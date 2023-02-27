import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import ProfilePost from "../profilePost/ProfilePost";
import ProfileSetup from "../profileSetup/ProfileSetup";
import ProfileShare from "../profileShare/ProfileShare";
import "./profilePosts.css";

const ProfilePosts = ({ user, own }) => {
  const { currentUser, token } = useContext(AuthContext);
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [pinnedPost, setPinnedPost] = useState("");
  const toast = useToast();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${user._id}`,
        config
      );
      setPosts(response.data.posts.reverse());
    } catch (error) {
      return toast({
        title: "Cannot fetch posts!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const fetchPinnedPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${user._id}`,
        config
      );
      setPinnedPost(response.data.user.pinnedPost);
    } catch (error) {
      return toast({
        title: "Cannot fetch posts!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchPosts();
    fetchPinnedPost();
  }, []);

  return (
    <div className="profilePosts">
      {user && (
        <>
          <ProfileShare user={user} own={own} />
          <ProfileSetup />
          <div className="pinnedPost">
            {pinnedPost && (
              <>
                <span className="postText">Pinned post</span>
                <ProfilePost
                  post={pinnedPost}
                  own={own}
                  user={user}
                  fetchPosts={fetchPinnedPost}
                />
              </>
            )}
          </div>
          <div className="otherPosts">
            {pinnedPost && <span className="postText">Other posts</span>}
            <div
              className="profileOtherPosts"
              style={{ marginTop: !pinnedPost ? "-20px" : "0" }}
            >
              {pinnedPost
                ? posts
                    .filter((post) => post._id !== pinnedPost._id)
                    .map((post) => (
                      <ProfilePost
                        post={post}
                        own={own}
                        user={user}
                        key={post._id}
                        fetchPosts={fetchPosts}
                      />
                    ))
                : posts.map((post) => (
                    <ProfilePost
                      post={post}
                      own={own}
                      user={user}
                      key={post._id}
                      fetchPosts={fetchPosts}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePosts;
