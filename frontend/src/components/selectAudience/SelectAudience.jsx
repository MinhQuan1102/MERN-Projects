import React from "react";
import "./selectAudience.css";
import {
  faCircle,
  faCog,
  faGlobeEurope,
  faLeftLong,
  faLock,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleDisplayPostStatus, handleConvertStatus } from "../longFunction";

const SelectAudience = ({
  open,
  setOpen,
  setOpenCreatePost,
  setOpenEditPost,
  creatingPost,
  status,
  setStatus,
  handleUpdateAudience,
  initialStatus,
}) => {
  
  const handleCancel = () => {
    setStatus(handleDisplayPostStatus(initialStatus));
    setOpen(false);
    setOpenCreatePost && setOpenCreatePost(true);
    setOpenEditPost && setOpenEditPost(true);
  };

  const handleBack = () => {
    setOpen(false);
    setStatus("Public");
    setOpenCreatePost && setOpenCreatePost(true);
    setOpenEditPost && setOpenEditPost(true);
  };

  const handleChooseStatus = (e) => {
    setOpen(false);
    setOpenCreatePost && setOpenCreatePost(true);
    setOpenEditPost && setOpenEditPost(true);
  };
  return (
    <div className={open ? "selectAudience" : "selectAudience hide"}>
      <div className="header">
        {creatingPost && (
          <FontAwesomeIcon
            icon={faLeftLong}
            className="backBtn"
            onClick={handleBack}
          />
        )}

        <p>Select audience</p>
        {!creatingPost && (
          <FontAwesomeIcon
            icon={faTimes}
            className="closeBtn"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
      <div className="body">
        <div className="description">
          <span className="bigDesc">
            To help friends find you, your current profile picture can be seen
            by everyone.
          </span>
          <span className="smallDesc">
            You can decide who should see the other details, such as the
            description, likes or comments.
          </span>
        </div>
        <div className="content">
          <ul>
            <li
              className="audienceOptions"
              id="Public"
              onClick={(e) => setStatus(e.currentTarget.id)}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faGlobeEurope} className="statusIcon" />
              </div>
              <div className="textArea">
                <h2>Public</h2>
                <p>Anyone on or off MQSocial</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={
                    status === "Public" ? "checkIcon activeIcon" : "checkIcon"
                  }
                />
              </div>
            </li>
            <li
              className="audienceOptions"
              id="Friends"
              onClick={(e) => setStatus(e.currentTarget.id)}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faUserFriends} className="statusIcon" />
              </div>
              <div className="textArea">
                <h2>Friends</h2>
                <p>Your friends on MQSocial</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={
                    status === "Friends" ? "checkIcon activeIcon" : "checkIcon"
                  }
                />
              </div>
            </li>
            <li
              className="audienceOptions"
              id="Private"
              onClick={(e) => setStatus(e.currentTarget.id)}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faLock} className="statusIcon" />
              </div>
              <div className="textArea">
                <h2 className="onlyMe">Only me</h2>
                <FontAwesomeIcon
                  icon={faCircle}
                  className={
                    status === "Private" ? "checkIcon activeIcon" : "checkIcon"
                  }
                />
              </div>
            </li>
            <li className="audienceOptions">
              <div className="icon">
                <FontAwesomeIcon icon={faCog} className="statusIcon" />
              </div>
              <div className="textArea">
                <h2>Custom</h2>
                <p>Include and exclude friends and lists</p>
                <FontAwesomeIcon icon={faCircle} className="checkIcon" />
              </div>
            </li>
          </ul>
        </div>
        <div className="audienceButtons">
          <button
            className="cancel"
            onClick={
              setOpenCreatePost || setOpenEditPost ? handleBack : handleCancel
            }
          >
            Cancel
          </button>
          <button
            className="done"
            onClick={
              setOpenCreatePost || setOpenEditPost
                ? (e) => handleChooseStatus(e)
                : () => handleUpdateAudience(handleConvertStatus(status))
            }
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAudience;
