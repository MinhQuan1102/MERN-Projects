import React, { useRef, useState, useEffect } from "react";
import "./postContent.css";
import { handleDisplayPostStatusIcon } from "../longFunction";
import { format } from "timeago.js";

const PostContent = ({ post, user, postDetail, setOpenImageDetail }) => {
  const { content, images, isUpdatingProfilePicture, isUpdatingCoverPicture } =
    post;
  const postBackground = useRef();
  const [postWidth, setPostWidth] = useState(
    postBackground.current?.offsetWidth
  );
  const [postHeight, setPostHeight] = useState(
    postBackground.current?.offsetHeight
  );
  const [openSelectAudience, setOpenSelectAudience] = useState(false);

  useEffect(() => {
    if (postBackground.current) {
      setPostWidth(postBackground.current.offsetWidth);
      setPostHeight(postBackground.current.offsetHeight);
    }
    function handleResize() {
      setPostWidth(postBackground.current?.offsetWidth);
      setPostHeight(postBackground.current?.offsetHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [postBackground]);
  const body = () => {
    if (isUpdatingProfilePicture) {
      return (
        <div className="postBackground" ref={postBackground}>
          <div
            className="postCoverImg"
            style={{ backgroundColor: user.coverPicture && "#E4E6EB" }}
          >
            <img src={user.coverPicture} alt="" />
          </div>
          <div
            className="postProfileImg"
            style={{
              top: postHeight
                ? `${postHeight / 2 - 160}px`
                : `${postBackground.current?.offsetWidth}px`,
              left: postWidth
                ? `${postWidth / 2 - 170}px`
                : `${postBackground.current?.offsetHeight}px`,
            }}
          >
            <img src={images[0]} alt="" onClick={() => setOpenImageDetail(true)} />
          </div>
        </div>
      );
    } else if (isUpdatingCoverPicture) {
      return (
        <div className="postBackground" ref={postBackground}>
          <div className="postCoverImg">
            <img src={images} alt="" />
          </div>
          <div
            className="postProfileImg"
            style={{
              top: postHeight
                ? `${postHeight / 2 - 150}px`
                : `${postBackground.current?.offsetWidth}px`,
              left: postWidth
                ? `${postWidth / 2 - 150}px`
                : `${postBackground.current?.offsetHeight}px`,
            }}
          >
            <img src={user.avatar} alt="" />
          </div>
        </div>
      );
    } else if (images.length === 0) {
      return <></>;
    } else if (images.length === 1) {
      return (
        <div className="postBackground">
          <img src={images} alt="" className="postImage" />
        </div>
      );
    } else if (images.length === 2) {
      return (
        <div className="postBackground" style={{ height: "auto" }}>
          <div
            className="imagesContainer"
            style={{ height: "auto", alignItems: "center" }}
          >
            {images.map((image, i) => (
              <img
                src={image}
                key={i}
                alt=""
                className={`postImage2${i + 1}`}
              />
            ))}
          </div>
        </div>
      );
    } else if (images.length === 3) {
      return (
        <div className="postBackground" style={{ height: "auto" }}>
          <div className="imagesContainer" style={{ height: "auto" }}>
            <div className="leftImage">
              <img src={images[0]} alt="" className="postImage31" />
            </div>
            <div className="rightImages">
              <img src={images[1]} alt="" className="postImage32" />
              <img src={images[2]} alt="" className="postImage33" />
            </div>
          </div>
        </div>
      );
    } else if (images.length === 4) {
      return (
        <div className="postBackground" style={{ height: "auto" }}>
          <div
            className="imagesContainer"
            style={{ height: "auto", flexWrap: "wrap" }}
          >
            {images.map((image, i) => (
              <img src={image} key={i} alt="" className={`postImage4`} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="postBackground" style={{ height: "auto" }}>
          <div
            className="imagesContainer"
            style={{ height: "auto", flexWrap: "wrap", position: "relative" }}
          >
            {images.slice(0, 4).map((image, i) => (
              <img src={image} key={i} alt="" className={`postImage4`} />
            ))}
            <div className="overflowText">{`+${images.length - 4}`}</div>
          </div>
        </div>
      );
    }
  };

  const sharedPostImages = (images) => {
    if (images.length === 0) {
      return <></>;
    } else if (images.length === 1) {
      return (
        <div className="sharedPostImages">
          <img src={images[0]} alt="" className="sharedPostImage" />
        </div>
      );
    } else if (images.length === 2) {
      return (
        <div className="sharedPostImages" style={{ gap: "2px" }}>
          {images.map((image, i) => (
            <img
              src={image}
              alt=""
              key={i}
              className={`sharedPostImage2${i + 1}`}
            />
          ))}
        </div>
      );
    } else if (images.length === 3) {
      return (
        <div className="sharedPostImages" style={{ gap: "2px" }}>
          {images.map((image, i) => (
            <img src={image} alt="" key={i} className={`sharedPostImage3`} />
          ))}
        </div>
      );
    } else if (images.length === 4) {
      return (
        <div
          className="sharedPostImages"
          style={{ gap: "2px", flexWrap: "wrap", justifyContent: "center" }}
        >
          {images.map((image, i) => (
            <img src={image} alt="" key={i} className={`sharedPostImage4`} />
          ))}
        </div>
      );
    } else {
      return (
        <div
          className="sharedPostImages"
          style={{ gap: "2px", flexWrap: "wrap", justifyContent: "center" }}
        >
          {images.slice(0, 4).map((image, i) => (
            <div className={`imageContainer${i + 1}`}>
              <img src={image} alt="" key={i} className={`sharedPostImage5`} />
              {i === 3 && (
                <span className="sharedPostOverFlowImages">{`+${
                  images.length - 4
                }`}</span>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={images.length > 0 ? "postContent" : "noImage"}>
      {user && (
        <>
          <div
            className="postDescContainer"
            style={{ padding: postDetail && "0 10px" }}
          >
            <p
              className={
                content.length < 80 && !postDetail ? "postDesc" : "postManyDesc"
              }
            >
              {content}
            </p>
          </div>
          {body()}
          {/* <video width="100%" controls>
        <source type="video/mp4"/>
      </video> */}
          {post.sharedPost && (
            <div className="sharedPost">
              <div className="sharedPostContainer">
                {sharedPostImages(post.sharedPost.images)}
                <div className="sharedPostUser">
                  <div className="sharedPostUserAvatar">
                    <img src={post.sharedPost.user.avatar} alt="" />
                  </div>
                  <div className="sharedPostUserInfo">
                    <h2>{post.sharedPost.user.fullName}</h2>
                    <div className="postStatus">
                      <span>{format(post.sharedPost.createdAt)}</span>
                      {"•"}
                      <span>
                        {handleDisplayPostStatusIcon(
                          post.status,
                          setOpenSelectAudience
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sharedPostContent">
                  <p>{post.sharedPost.content}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostContent;
