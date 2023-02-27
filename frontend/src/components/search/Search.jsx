import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./search.css";

const Search = ({
  searchResult,
  open,
  setOpen,
  location,
  isProfilePage,
  setSearchResult,
  query,
  setQuery,
}) => {
  const { currentUser, handleNoAva, searchHistory, setSearchHistory } =
    useContext(AuthContext);
  const { left, width } = location;
  const friendIds = currentUser.friends.map((friend) => friend._id);
  const isFriend = searchResult.map((friend) => friendIds.includes(friend._id));
  const recentIsFriend = searchHistory.map((friend) =>
    friendIds.includes(friend._id)
  );
  const history = useHistory();
  const search = useRef();

  const deleteMatchingUser = (arr, obj) => {
    return arr.filter((item) => item._id !== obj._id);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (search.current && !search.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  const handleClick = (user, userId) => {
    history.push(`/profile/${userId}`);
    const newHistory = deleteMatchingUser(searchHistory, user);
    setSearchHistory([user, ...newHistory]);
    setSearchResult([]);
    setQuery("");
    window.location.reload();
  };

  const handleDeleteSearch = (user) => {
    const newHistory = deleteMatchingUser(searchHistory, user);
    setSearchHistory([...newHistory]);
  };
  searchResult.length > 0 && console.log(searchResult[0]._id)

  return (
    <div className={open ? "searchUser" : "searchUser hide"}>
      <div className="searchContainer">
        {!isProfilePage && <div className="searchLeft"></div>}
        {isProfilePage ? (
          <div
            className="searchUsers"
            style={{
              top: `0px`,
              left: `${left}px`,
              width: `${width}px`,
              position: "absolute",
            }}
            ref={search}
          >
            {!query && (
              <>
                <span className="recentSearch">Recent searches</span>
                {searchHistory.map((user, i) => (
                  <div
                    className="searchItem"
                    key={user._id}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="searchLeft"
                      onClick={() => handleClick(user, user._id)}
                      style={{ minWidth: "90%"}}
                    >
                      <img
                        src={user.avatar ? user.avatar : handleNoAva(user)}
                        alt=""
                        className="userAva"
                      />
                      <div className="friendInfo">
                        <div className="userFullName">{user.fullName}</div>
                        {recentIsFriend[i] && (
                          <span className="isFriend">Friend</span>
                        )}
                      </div>
                    </div>

                    <div className="searchRight">
                      <div
                        className="deleteFromSearch"
                        onClick={() => handleDeleteSearch(user)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {query &&
              searchResult.slice(0, 10).map((user, i) => (
                <div
                  className="searchItem"
                  key={user._id}
                  onClick={() => handleClick(user, user._id)}
                >
                  <img
                    src={user.avatar ? user.avatar : handleNoAva(user)}
                    alt=""
                    className="userAva"
                  />
                  <div className="friendInfo">
                    <div className="userFullName">{user.fullName}</div>
                    {recentIsFriend[i] && (
                      <span className="isFriend">Friend</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="searchUsers" ref={search}>
            {!query && (
              <>
                <div className="left"></div>
                <span className="recentSearch">Recent searches</span>
                {searchHistory.map((user, i) => (
                  <div
                    className="searchItem"
                    key={user._id}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="searchLeft"
                      onClick={() => handleClick(user, user._id)}
                    >
                      <img
                        src={user.avatar ? user.avatar : handleNoAva(user)}
                        alt=""
                        className="userAva"
                      />
                      <div className="friendInfo">
                        <div className="userFullName">{user.fullName}</div>
                        {recentIsFriend[i] && (
                          <span className="isFriend">Friend</span>
                        )}
                      </div>
                    </div>

                    <div className="searchRight">
                      <div
                        className="deleteFromSearch"
                        onClick={() => handleDeleteSearch(user)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {query &&
              searchResult.slice(0, 10).map((user, i) => (
                <div
                  className="searchItem"
                  key={user._id}
                  onClick={() => handleClick(user, user._id)}
                >
                  <img
                    src={user.avatar ? user.avatar : handleNoAva(user)}
                    alt=""
                    className="userAva"
                  />
                  <div className="friendInfo">
                    <div className="userFullName">{user.fullName}</div>
                    {isFriend[i] && <span className="isFriend">Friend</span>}
                  </div>
                </div>
              ))}
          </div>
        )}
        {!isProfilePage && <div className="searchRight"></div>}
      </div>
    </div>
  );
};

export default Search;
