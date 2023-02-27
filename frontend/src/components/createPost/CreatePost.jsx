import React, { useContext, useRef, useState } from "react";
import "./createPost.css";
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
  uploadPost,
  handleConvertStatus,
  handleDragOver,
  handleDrop,
} from "../longFunction";
import TagPeople from "../tagPeople/TagPeople";

const CreatePost = ({
  setIsCreatingPost,
  own,
  user,
  editImage,
  setEditImage,
  tagPeople,
  setTagPeople,
}) => {
  const { currentUser, token, setBlur } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [selectedBackground, setSelectedBackground] =
    useState("backgroundItem1");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#0B404D");
  const [fontSize, setFontSize] = useState("20px");
  const [fontWeight, setFontWeight] = useState("400");
  const [textAlign, setTextAlign] = useState("left");
  const [height, setHeight] = useState("120px");
  const [isSeletingAudience, setIsSeletingAudience] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(true);
  const [status, setStatus] = useState("Public");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [taggedPeople, setTaggedPeople] = useState([]);
  const taggedPeopleIds = taggedPeople.map((friend) => friend._id) || [];
  const inputRef = useRef();
  const createPost = useRef();
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

  const handleClose = () => {
    setIsCreatingPost(false);
    setBlur(false);
  };

  const handleSelectAudience = () => {
    setOpenCreatePost(false);
    setIsSeletingAudience(true);
  };

  const handleCloseImage = () => {
    setImages([]);
    setFiles([]);
    setEditImage(false);
  };

  const handleOpenEditImage = () => {
    if (backgroundColor === "#FFFFFF") {
      setEditImage(true);
    } else return;
  };

  const handleOpenTagPeople = () => {
    setOpenCreatePost(false);
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
        className={openCreatePost ? "createPost" : "createPost hide"}
        ref={createPost}
      >
        <div className="header">
          <FontAwesomeIcon
            icon={faTimes}
            className="closeBtn"
            onClick={handleClose}
          />
          <p>Create post</p>
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
                placeholder={
                  own
                    ? "What's on your mind?"
                    : `Write something to ${user.fullName}...`
                }
                onChange={(e) => handleChange(e)}
              />
            </div>
            {!editImage && (
              <div className="backgroundColor">
                <ul className="backgroundItems">
                  {backgroundData.map((bg, i) => handleBackgroundBorder(bg, i))}
                </ul>
              </div>
            )}
            {editImage && (
              <div className="postImageSite">
                <div
                  className="postImageContainer"
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, images, inputRef, setImages)}
                >
                  {images.length > 0 &&
                    handleImages(
                      images,
                      images.length,
                      handleCloseImage,
                      false
                    )}
                  {images.length === 0 && (
                    <div className="inputImage">
                      <input
                        type="file"
                        multiple
                        onChange={(event) => setImages([...event.target.files])}
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
            content ||
            images.length > 0 ||
            files.length > 0 ||
            taggedPeople.length > 0
              ? "postBtn postable"
              : "postBtn"
          }
          disabled={!content && images.length === 0}
          onClick={() =>
            uploadPost(
              images,
              currentUser,
              content,
              taggedPeopleIds,
              handleConvertStatus(status),
              config,
              toast
            )
          }
        >
          Post
        </button>
      </div>
      <SelectAudience
        open={isSeletingAudience}
        setOpen={setIsSeletingAudience}
        setOpenCreatePost={setOpenCreatePost}
        creatingPost={true}
        status={status}
        setStatus={setStatus}
      />
      <TagPeople
        open={tagPeople}
        setOpen={setTagPeople}
        setOpenCreatePost={setOpenCreatePost}
        taggedPeople={taggedPeople}
        setTaggedPeople={setTaggedPeople}
      />
    </>
  );
};

export default CreatePost;
