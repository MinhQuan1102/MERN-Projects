import React, { useContext } from "react";
import "./reactDisplay.css";
import {
  faHeart,
  faShare,
  faThumbsUp,
  faTimes,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import { displayUserAvaReact, reactDetail } from "../longFunction";
import { AuthContext } from "../../context/AuthContext";

const ReactDisplay = ({
  post,
  open,
  setOpen,
  selectedType,
  setSelectedType,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { react, like, haha, sad, wow, heart, angry } = post;
  let reactArray = [
    ["like", ...like],
    ["heart", ...heart],
    ["haha", ...haha],
    ["wow", ...wow],
    ["sad", ...sad],
    ["angry", ...angry],
  ].sort((a, b) => b.length - a.length);
  const handleCurrentReactType = (reactType) => {
    switch (reactType) {
      case "all": return react;
      case "like": return like;
      case "heart": return heart;
      case "haha": return haha;
      case "wow": return wow;
      case "sad": return sad;
      case "angry": return angry
    }
  }
  return (
    <div className={open ? "reactDisplay" : "reactDisplay hide"}>
      <div className="reactHeader">
        <ul>
          <li
            className={selectedType === "all" ? "active activeall" : ""}
            onClick={() => setSelectedType("all")}
          >
            <p>All</p>
          </li>
          {reactArray.slice(0, 3).map((react, i) => (
            <li
              className={selectedType === react[0] ? `active active${react[0]}` : ""}
              onClick={() => setSelectedType(`${react[0]}`)}
              key={i}
            >
              {react.length > 1 && (
                <>
                  {reactDetail(react[0])}
                  <p>{react.length - 1}</p>
                </>
              )}
            </li>
          ))}
        </ul>
        <FontAwesomeIcon
          icon={faTimes}
          className="closeBtn"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="reactBody">
        <ul>
          {handleCurrentReactType(selectedType).reverse().map((user) => (
            <li key={user._id}>
              <div className="reactBodyLeft">
                {displayUserAvaReact(user, like, heart, haha, wow, sad, angry)}

                <span>{user.fullName}</span>
              </div>
              {currentUser._id !== user._id && (
                <div className="reactBodyRight">
                  {currentUser.friends
                    .map((friend) => friend._id)
                    .includes(user._id) && (
                    <>
                      <div className="messenger">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            className="messengerIcon"
                            d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                          />
                        </svg>
                      </div>
                      <span>Message</span>
                    </>
                  )}
                  {!currentUser.friends
                    .map((friend) => friend._id)
                    .includes(user._id) &&
                    currentUser._id !== user._id && (
                      <>
                        <div className="messenger">
                          <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                        <span>Add friend</span>
                      </>
                    )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReactDisplay;
