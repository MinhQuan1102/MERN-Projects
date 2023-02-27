import React, { useContext, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEllipsis,
  faPlusCircle,
  faPen,
  faUserCheck,
  faMessage,
  faUserPlus,
  faUserMinus,
  faImages,
  faUpload,
  faUserXmark,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import "./profileImage.css";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../../context/AuthContext";
import UpdateAvatar from "../updateAvatar/UpdateAvatar";
import UpdateCover from "../updateCover/UpdateCover";
import {
  sendFriendRequest,
  confirmRequest,
  deleteRequest,
  handleFriendList,
  followUser,
  unfollowUser,
  unfriend,
} from "../../longFunction";

const ProfileImage = ({ own, user, userFriends }) => {
  const noCoverPicture =
    "https://i.pinimg.com/originals/b3/9f/d8/b39fd8fd5ac2e8c25938e2fd1783d016.jpg";
  const { currentUser, setCurrentUser, handleNoAva, token } =
    useContext(AuthContext);
  const toast = useToast();
  let isFriend = currentUser.friends.some((friend) => friend._id === user._id);
  let isFollowing = currentUser.followings.some(
    (friendId) => friendId === user._id
  );

  // you send friend request to another user
  let isPending = user?.pendingUsers.includes(currentUser._id.toString());

  // check if this user has sent a friend request to you
  let respondFriendRequest = currentUser.pendingUsers.includes(
    user._id.toString()
  );
  const userFriendId = userFriends.map((friend) => friend._id);
  const currentUserFriendId = currentUser.friends.map((friend) => friend._id);
  const mutualFriends = userFriendId.filter((friend) =>
    currentUserFriendId.includes(friend)
  ).length;
  const [sentFriendRequest, setSentFriendRequest] = useState(isPending);

  // check if this user has sent a friend request to you
  const [isRespondFriendReq, setIsSentFriendReq] =
    useState(respondFriendRequest);
  const [pic, setPic] = useState(null);
  const [cover, setCover] = useState(null);
  const [isOpenFriendOption, setIsOpenFriendOption] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [isUpdatingCover, setIsUpdatingCover] = useState(true);
  const [openEditCoverOptions, setOpenEditCoverOptions] = useState(false);
  const editCoverOptions = useRef();
  const friendBtn = useRef();
  const history = useHistory();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSwitchProfile = (userId) => {
    history.push(`/profile/${userId}`);
    window.location.reload();
  };

  const handleAvatarChange = (e) => {
    setPic(e.target.files[0]);
    setIsUpdatingAvatar(true);
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
    setIsUpdatingCover(true);
    setOpenEditCoverOptions(false);
  };

  const handleClickOutside = (event) => {
    if (
      editCoverOptions.current &&
      !editCoverOptions.current.contains(event.target)
    ) {
      setOpenEditCoverOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profileImage">
      {user && (
        <>
          <div className="coverImageContainer">
            <header className="coverHeader">
              <img
                src={user.coverPicture ? user.coverPicture : noCoverPicture}
                alt=""
                className="coverImg"
              />
              <div className="coverImage">
                <div className="coverImageEditBtn">
                  {own && (
                    <button
                      className="editCoverBtn"
                      onClick={() =>
                        setOpenEditCoverOptions(!openEditCoverOptions)
                      }
                    >
                      <FontAwesomeIcon icon={faCamera} />
                      <span>Edit cover photo</span>
                    </button>
                  )}
                  {openEditCoverOptions && (
                    <div className="editCoverOptions" ref={editCoverOptions}>
                      <div className="editCoverOptionsContainer">
                        <div className="editCoverOption">
                          <FontAwesomeIcon
                            icon={faImages}
                            className="editCoverIcon"
                          />
                          <span>Select photo</span>
                        </div>
                        <label htmlFor="file">
                          <div className="editCoverOption">
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="editCoverIcon"
                            />
                            <span>Upload photo</span>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="file"
                              accept=".png,.jpeg,.jpg"
                              onChange={(e) => handleCoverChange(e)}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>
            {cover && (
              <UpdateCover
                isUpdatingCover={isUpdatingCover}
                setIsUpdatingCover={setIsUpdatingCover}
                cover={cover}
                setCover={setCover}
              />
            )}
          </div>

          {/* end cover image container */}

          <div
            className={
              isRespondFriendReq
                ? "profileContainerRequest"
                : "profileContainer"
            }
          >
            <div className="profileImageSite">
              <div className="profileImage">
                <img
                  src={user.avatar ? user.avatar : handleNoAva(user)}
                  alt=""
                  className="userAvatar"
                />
                {own && (
                  <label htmlFor="file">
                    <FontAwesomeIcon icon={faCamera} className="editImg" />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => handleAvatarChange(e)}
                    />
                  </label>
                )}
              </div>
            </div>
            {pic && (
              <UpdateAvatar
                isUpdatingAvatar={isUpdatingAvatar}
                setIsUpdatingAvatar={setIsUpdatingAvatar}
                pic={pic}
                setPic={setPic}
              />
            )}
            <div className="profileNameInfo">
              <h1>
                <span className="profileText">{user.fullName}</span>
              </h1>

              <p>
                <span className="friendText">
                  {userFriends.length}{" "}
                  {userFriends.length > 1 ? "Friends" : "Friend"}
                  {(!own && mutualFriends) > 0 && (
                    <span> • {mutualFriends} mutual</span>
                  )}
                </span>
              </p>

              <div className="friendImages">
                {userFriends.slice(0, 6).map((friend, i) => (
                  <div className={`friendImage ${handleFriendList(i)}`} key={i}>
                    <img
                      src={friend.avatar ? friend.avatar : handleNoAva(friend)}
                      alt=""
                      onClick={() => handleSwitchProfile(friend._id)}
                    />
                    {i > 4 && (
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="moreFriend"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="profileButtonSite" ref={friendBtn}>
              {own ? (
                <div className="btnSite">
                  <span className="addStoryBtn btn">
                    <FontAwesomeIcon icon={faPlusCircle} className="btnIcon" />
                    Add To Story
                  </span>
                  <span className="editProfileBtn btn">
                    <FontAwesomeIcon icon={faPen} className="btnIcon" />
                    Edit Profile
                  </span>
                </div>
              ) : (
                <div className="btnSite">
                  {isFriend ? (
                    <>
                      <span
                        className="editProfileBtn btn"
                        onClick={() =>
                          setIsOpenFriendOption(!isOpenFriendOption)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faUserCheck}
                          className="btnIcon"
                        />
                        Friends
                      </span>
                      <span className="addStoryBtn btn">
                        <FontAwesomeIcon icon={faMessage} className="btnIcon" />
                        Message
                      </span>
                    </>
                  ) : (
                    <>
                      {isRespondFriendReq ? (
                        <span className="addStoryBtn btn">
                          <FontAwesomeIcon
                            icon={faUserCheck}
                            className="btnIcon"
                          />
                          Respond
                        </span>
                      ) : (
                        <span
                          className="addStoryBtn btn"
                          onClick={() =>
                            sendFriendRequest(
                              sentFriendRequest,
                              setSentFriendRequest,
                              user,
                              currentUser._id,
                              config,
                              toast
                            )
                          }
                        >
                          {sentFriendRequest ? (
                            <FontAwesomeIcon
                              icon={faUserMinus}
                              className="btnIcon"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              className="btnIcon"
                            />
                          )}
                          {sentFriendRequest ? "Cancel Request" : "Add friend"}
                        </span>
                      )}

                      <span className="editProfileBtn btn">
                        <FontAwesomeIcon icon={faMessage} className="btnIcon" />
                        Message
                      </span>
                    </>
                  )}
                  {isOpenFriendOption && (
                    <div className="editFriendOptions">
                      <div className="editFriendOptionsContainer">
                        {isFollowing ? (
                          <div
                            className="editFriendOption"
                            onClick={() =>
                              unfollowUser(user, currentUser._id, config, toast)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faImages}
                              className="editFriendIcon"
                            />
                            <span className="editFriendText">Unfollow</span>
                          </div>
                        ) : (
                          <div
                            className="editFriendOption"
                            onClick={() =>
                              followUser(user, currentUser._id, config, toast)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faHandshake}
                              className="editFriendIcon"
                            />
                            <span className="editFriendText">Follow</span>
                          </div>
                        )}

                        <div
                          className="editFriendOption"
                          onClick={() =>
                            unfriend(user, currentUser._id, config, toast)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faUserXmark}
                            className="editCoverIcon"
                          />
                          <span className="editFriendText">Unfriend</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {isRespondFriendReq && (
            <div className="respondRequest">
              <div className="requestText">{`${user.fullName} sent you a friend request`}</div>
              <div className="respondBtns">
                <span
                  className="addStoryBtn"
                  onClick={() =>
                    confirmRequest(
                      user,
                      currentUser._id,
                      setIsSentFriendReq,
                      config,
                      toast
                    )
                  }
                >
                  Confirm Request
                </span>
                <span
                  className="editProfileBtn"
                  onClick={() =>
                    deleteRequest(
                      user,
                      currentUser._id,
                      setIsSentFriendReq,
                      config,
                      toast
                    )
                  }
                >
                  Delete Request
                </span>
              </div>
            </div>
          )}
          
        </>
      )}
    </div>
  );
};

export default ProfileImage;
