import {
  faHouse,
  faMessage,
  faPen,
  faPlus,
  faUserCheck,
  faUserFriends,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import PostDetail from "../postDetail/PostDetail";
import "./userBadge.css";

const UserBadge = ({ user, open, setOpen, postDetail }) => {
  const { currentUser } = useContext(AuthContext);

  const isFriend = currentUser.friends
    .map((friend) => friend._id)
    .includes(user._id);
  const mutualFriends = user.friends
    .map((friend) => friend._id)
    .filter((friend) =>
      currentUser.friends.map((friend) => friend._id).includes(friend)
    );
  const mutualFriendsList = user.friends.filter((friend) =>
    mutualFriends.includes(friend._id)
  );

  const handleUsername = (username) => {
    return <span dangerouslySetInnerHTML={{ __html: `1 mutual friend, including <strong>${username}</strong>` }}></span>
  }
  return (
    <div
      className={open ? "userBadge" : "userBadgeHide"}
      style={{ left: postDetail && "-50px" }}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="userBadgeContainer">
        <div className="userInfo">
          <div className="userInfoLeft">
            <img src={user.avatar} alt="" />
          </div>
          <div className="userInfoRight">
            <h2>{user.fullName}</h2>
            {user._id === currentUser._id && (
              <ul>
                <li>
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="userInfoIcon"
                  />
                  <span>{`Lives in ${user.livesIn}`}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHouse} className="userInfoIcon" />
                  <span>{`From ${user.from}`}</span>
                </li>
              </ul>
            )}
            {isFriend && (
              <ul>
                {mutualFriends.length > 0 && (
                  <li>
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      className="userInfoIcon"
                    />
                    {mutualFriends.length === 1 && (
                      
                      <span>{`1 mutual friend
                      , including ${mutualFriendsList[0].fullName}`}</span>
                    )}
                    {mutualFriends.length === 2 && (
                      <span>{`2 mutual friends
                      , including ${mutualFriendsList[0].fullName} and ${mutualFriendsList[1].fullName}`}</span>
                    )}
                  </li>
                )}
                <li>
                  <FontAwesomeIcon icon={faHouse} className="userInfoIcon" />
                  <span>{`Lives in ${user.livesIn}`}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHouse} className="userInfoIcon" />
                  <span>{`From ${user.from}`}</span>
                </li>
              </ul>
            )}
            {(!isFriend && user._id !== currentUser._id) && (
              <ul>
                {mutualFriends.length > 0 && (
                  <li>
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      className="userInfoIcon"
                    />
                    {mutualFriends.length === 1 && (
                      <span>{`1 mutual friend
                      , including ${handleUsername(mutualFriendsList[0].fullName)}`}</span>
                    )}
                    {mutualFriends.length === 2 && (
                      <span>{`2 mutual friends
                      , including ${mutualFriendsList[0].fullName} and ${mutualFriendsList[1].fullName}`}</span>
                    )}
                  </li>
                )}
                <li>
                  <FontAwesomeIcon icon={faHouse} className="userInfoIcon" />
                  <span>{`Lives in ${user.livesIn}`}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHouse} className="userInfoIcon" />
                  <span>{`From ${user.from}`}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="userButtons">
          {user._id === currentUser._id && (
            <>
              <button className="addToStoryBtn">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add to Story</span>
              </button>
              <button className="editProfileBtn">
                <FontAwesomeIcon icon={faPen} />
                <span>Edit profile</span>
              </button>
            </>
          )}
          {isFriend && (
            <>
              <button className="addToStoryBtn">
                <FontAwesomeIcon icon={faUserCheck} />
                <span>Friends</span>
              </button>
              <button className="editProfileBtn">
                <FontAwesomeIcon icon={faMessage} />
                <span>Message</span>
              </button>
            </>
          )}
          {(!isFriend && user._id !== currentUser._id) && (
            <>
              <button className="addToStoryBtn">
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Add friend</span>
              </button>
              <button className="editProfileBtn">
                <FontAwesomeIcon icon={faMessage} />
                <span>Message</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBadge;
