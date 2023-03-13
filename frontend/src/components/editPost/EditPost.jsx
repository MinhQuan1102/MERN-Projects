import React, { useContext, useRef, useState, useEffect } from "react";
import "./editPost.css";
import {
  faCaretDown,
  faFlag,
  faImage,
  faImages,
  faLaugh,
  faLocationDot,
  faTimes,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { backgroundData } from "../backgroundData";
import SelectAudience from "../selectAudience/SelectAudience";
import {
  handleStatusIcon,
  handleImages,
  handleDisplayTag,
  handleDisplayPostStatus,
  editPost,
  handleConvertStatus,
  handleDragOver,
  handleDrop,
} from "../longFunction";
import TagPeople from "../tagPeople/TagPeople";

const EditPost = ({
  setOpen,
  post,
  editImage,
  setEditImage,
  tagPeople,
  setTagPeople,
}) => {
  const { currentUser, token, setBlur } = useContext(AuthContext);
  const [content, setContent] = useState(post.content);
  const [selectedBackground, setSelectedBackground] =
    useState("backgroundItem1");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#0B404D");
  const [fontSize, setFontSize] = useState("20px");
  const [fontWeight, setFontWeight] = useState("400");
  const [textAlign, setTextAlign] = useState("left");
  const [height, setHeight] = useState("120px");
  const [isSeletingAudience, setIsSeletingAudience] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(true);
  const [status, setStatus] = useState(handleDisplayPostStatus(post.status));
  const [images, setImages] = useState(post.images);
  const [newImages, setNewImages] = useState([]);
  const [taggedPeople, setTaggedPeople] = useState(post.taggedFriends);
  const taggedPeopleIds = taggedPeople.map((friend) => friend._id);
  const inputRef = useRef();
  const editPost = useRef();
  const initialContent = post.content;
  const initialTag = post.taggedFriends;
  const initialImages = post.images;
  const hasImages = post.images.length > 0;
  const toast = useToast();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(newImages);
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setContent(initialContent);
    setTaggedPeople(initialTag);
    setEditImage(hasImages);
    setImages(initialImages);
    setBlur(false);
  };

  const handleSelectAudience = () => {
    setOpenEditPost(false);
    setIsSeletingAudience(true);
  };

  const handleCloseImage = () => {
    setImages([]);
    setNewImages([]);
    setEditImage(false);
  };

  const handleOpenEditImage = () => {
    if (backgroundColor === "#FFFFFF") {
      setEditImage(true);
    } else return;
  };

  const handleOpenTagPeople = () => {
    setOpenEditPost(false);
    setTagPeople(true);
  };

  const handleChooseBackground = (
    e,
    bgColor,
    textColor,
    fontSize,
    fontWeight,
    textAlign,
    height
  ) => {
    setSelectedBackground(e.target.id);
    setBackgroundColor(bgColor);
    setTextColor(textColor);
    setFontSize(fontSize);
    setFontWeight(fontWeight);
    setTextAlign(textAlign);
    setHeight(height);
  };

  const handleBackgroundBorder = (bg, i) => {
    if (selectedBackground === `backgroundItem${i + 1}`) {
      return (
        <li
          className="backgroundSelected"
          style={{
            backgroundColor: bg.backgroundColor,
            border: `3px solid ${bg.borderColor}`,
          }}
          id={`backgroundItem${i + 1}`}
          key={i}
        ></li>
      );
    } else {
      return (
        <li
          className="backgroundItem"
          style={{ backgroundColor: bg.backgroundColor }}
          id={`backgroundItem${i + 1}`}
          onClick={(e) =>
            handleChooseBackground(
              e,
              bg.backgroundColor,
              bg.textColor,
              bg.fontSize,
              bg.fontWeight,
              bg.textAlign,
              bg.height
            )
          }
          key={i}
        ></li>
      );
    }
  };

  return (
    <>
      <div
        className={openEditPost ? "editPost" : "editPost hide"}
        ref={editPost}
      >
        <div className="editPostContainer">
          <div className="header">
            <FontAwesomeIcon
              icon={faTimes}
              className="closeBtn"
              onClick={handleClose}
            />
            <p>Edit post</p>
          </div>

          <div className="body">
            <div className="userInfo">
              <div className="left">
                <img src={currentUser.avatar} alt="" className="userAvatar" />
              </div>
              <div className="right">
                {handleDisplayTag(currentUser.fullName, taggedPeople)}
                <div className="postStatus" onClick={handleSelectAudience}>
                  {handleStatusIcon(status)}
                  <span className="postStatusText">{status}</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className="postStatusIcon"
                  />
                </div>
              </div>
            </div>
            <div
              className="postContent"
              style={{
                backgroundColor: backgroundColor,
                height: backgroundColor === "#FFFFFF" ? "auto" : "200px",
              }}
            >
              <div
                className="inputContentBox"
                style={{ height: editImage ? "50px" : height }}
              >
                <textarea
                  type="text"
                  style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize: editImage ? "15px" : fontSize,
                    fontWeight: fontWeight,
                    textAlign: textAlign,
                    "::WebkitInputPlaceholder": {
                      color: "green",
                      opacity: "1",
                    },
                  }}
                  value={content}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {!editImage && (
                <div className="backgroundColor">
                  <ul className="backgroundItems">
                    {backgroundData.map((bg, i) =>
                      handleBackgroundBorder(bg, i)
                    )}
                  </ul>
                </div>
              )}
              {editImage && (
                <div className="postImageSite">
                  <div
                    className="postImageContainer"
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) =>
                      handleDrop(e, newImages, inputRef, setNewImages)
                    }
                  >
                    {newImages.length === 0 &&
                      handleImages(
                        images,
                        images.length,
                        handleCloseImage,
                        true
                      )}
                    {newImages.length > 0 &&
                      handleImages(
                        newImages,
                        newImages.length,
                        handleCloseImage,
                        false
                      )}
                    {images.length === 0 && newImages.length === 0 && (
                      <div className="inputImage">
                        <input
                          type="file"
                          multiple
                          onChange={(event) => setNewImages(event.target.files)}
                          hidden
                          accept="image/png, image/jpeg"
                          ref={inputRef}
                        />
                        <button
                          onClick={() => inputRef.current.click()}
                          className="addPhotoBtn"
                        >
                          <FontAwesomeIcon
                            icon={faImage}
                            className="addPhotoIcon"
                          />
                          <span className="bigDesc">Add photos/videos</span>
                          <span className="smallDesc">or drag and drop</span>
                        </button>
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="closeBtn dragAndDrop"
                          onClick={handleCloseImage}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="otherOptions">
            <div className="left">Add to your post</div>
            <div className="right">
              <ul>
                <li
                  className={
                    editImage ? "optionItems editingImage" : "optionItems"
                  }
                  id="Upload photo"
                  onClick={handleOpenEditImage}
                >
                  <FontAwesomeIcon
                    icon={faImages}
                    className={
                      backgroundColor === "#FFFFFF"
                        ? "uploadPhoto"
                        : "uploadPhoto disabled"
                    }
                  />
                </li>
                <li
                  className={
                    taggedPeople.length > 0
                      ? "optionItems hasTaggedPeople"
                      : "optionItems"
                  }
                  onClick={handleOpenTagPeople}
                >
                  <FontAwesomeIcon icon={faUserTag} className="tagPeople" />
                </li>
                <li className="optionItems">
                  <FontAwesomeIcon icon={faLaugh} className="feeling" />
                </li>
                <li className="optionItems">
                  <FontAwesomeIcon icon={faLocationDot} className="location" />
                </li>
                <li className="optionItems">
                  <FontAwesomeIcon icon={faFlag} className="lifeEvents" />
                </li>
              </ul>
            </div>
          </div>
          <button
            className={
              content || images.length > 0 || taggedPeople.length > 0
                ? "postBtn postable"
                : "postBtn"
            }
            disabled={!content}
            onClick={() =>
              editPost(
                newImages,
                post,
                content,
                taggedPeopleIds,
                handleConvertStatus(status),
                config,
                toast
              )
            }
          >
            Edit
          </button>
        </div>
      </div>
      <SelectAudience
        open={isSeletingAudience}
        setOpen={setIsSeletingAudience}
        setOpenEditPost={setOpenEditPost}
        creatingPost={true}
        status={status}
        setStatus={setStatus}
      />
      <TagPeople
        open={tagPeople}
        setOpen={setTagPeople}
        setOpenEditPost={setOpenEditPost}
        taggedPeople={taggedPeople}
        setTaggedPeople={setTaggedPeople}
      />
    </>
  );
};

export default EditPost;
