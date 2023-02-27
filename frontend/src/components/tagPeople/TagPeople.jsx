import React, { useContext, useState } from "react";
import "./tagPeople.css";
import {
  faLeftLong,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const TagPeople = ({
  open,
  setOpen,
  setOpenCreatePost,
  setOpenEditPost,
  taggedPeople,
  setTaggedPeople,
}) => {
  const { currentUser, token } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const toast = useToast;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/friends/?search=${query}`,
        { userId: currentUser._id },
        config
      );
      console.log(response.data);
      setSearchResult(
        response.data.filter(
          (friend) =>
            !taggedPeople.some((taggedFriend) => {
              // compare the properties of friend and taggedFriend
              return JSON.stringify(friend) === JSON.stringify(taggedFriend);
            })
        )
      );
    } catch (error) {
      toast({
        title: "Error fetching user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setOpenCreatePost && setOpenCreatePost(true);
    setOpenEditPost && setOpenEditPost(true);
  };

  const handleChooseTaggedPeople = (newFriend) => {
    setTaggedPeople([...taggedPeople, newFriend]);
  };

  const handleRemoveTaggedPeople = (removedFriend) => {
    setTaggedPeople(
      taggedPeople.filter((friend) => friend._id !== removedFriend)
    );
  };

  return (
    <div className={open ? "tagPeopleOption" : "tagPeopleOption hide"}>
      <div className="header">
        <FontAwesomeIcon
          icon={faLeftLong}
          className="backBtn"
          onClick={handleClose}
        />

        <p>Tag people</p>

      </div>
      <div className="body">
        <div className="searchSection">
          <div className="searchBar">
            <FontAwesomeIcon icon={faSearch} className="SearchIcon" />
            <input
              type="text"
              placeholder="Search for friends"
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <button onClick={handleClose}>Done</button>
        </div>
        <div className="findFriends">
          {taggedPeople.length > 0 && (
            <div className="tagged">
              <p>Tagged</p>
              <div className="taggedFriends">
                <ul>
                  {taggedPeople.map((friend, i) => (
                    <li key={i}>
                      <span className="friendName">{friend.fullName}</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="closeIcon"
                        onClick={() => handleRemoveTaggedPeople(friend._id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {!query && (
            <div className="suggestions">
              <p>Suggestions</p>
              <div className="suggestionFriends">
                <ul>
                  {currentUser.friends
                    .filter(
                      (friend) =>
                        !taggedPeople.some((taggedFriend) => {
                          // compare the properties of friend and taggedFriend
                          return (
                            JSON.stringify(friend) ===
                            JSON.stringify(taggedFriend)
                          );
                        })
                    )
                    .map((friend) => (
                      <li
                        key={friend._id}
                        onClick={() => handleChooseTaggedPeople(friend)}
                      >
                        <img
                          src={friend.avatar}
                          alt=""
                          className="friendAvatar"
                        />
                        <span className="suggestedFriendName">
                          {friend.fullName}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {query && (
            <div className="suggestions">
              <p>Search</p>
              <div className="suggestionFriends">
                <ul>
                  {searchResult.map((friend) => (
                    <li
                      key={friend._id}
                      onClick={() => handleChooseTaggedPeople(friend)}
                    >
                      <img
                        src={friend.avatar}
                        alt=""
                        className="friendAvatar"
                      />
                      <span className="suggestedFriendName">
                        {friend.fullName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagPeople;
