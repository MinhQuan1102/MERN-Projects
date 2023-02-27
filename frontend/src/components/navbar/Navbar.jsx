import React, { useContext, useState, useRef, useEffect } from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useToast,
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-solid-svg-icons";
import Search from "../search/Search";
import axios from "axios";

const Navbar = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const { currentUser, token, handleNoAva } = useContext(AuthContext);
  const isProfilePage = path.split("/")[1].startsWith("profile");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchBarProfileLocation, setSearchBarProfileLocation] = useState({
    left: 163,
    top: 8,
    width: 300,
    height: 35,
  });
  const [searchBarLocation, setSearchBarLocation] = useState({
    left: 163,
    top: 8,
    width: 300,
    height: 35,
  });

  const toast = useToast();
  const searchBar = useRef();
  const searchBarProfile = useRef();

  useEffect(() => {
    const handleResize = () => {
      const searchBarElement = searchBar.current;
      const searchBarProfileElement = searchBarProfile.current;
      const location = !isProfilePage
        ? {
            left: searchBarElement.offsetLeft,
            top: searchBarElement.offsetTop,
            width: searchBarElement.offsetWidth,
            height: searchBarElement.offsetHeight,
          }
        : {
            left: searchBarProfileElement.offsetLeft,
            top: searchBarProfileElement.offsetTop,
            width: searchBarProfileElement.offsetWidth,
            height: searchBarProfileElement.offsetHeight,
          };
      !isProfilePage
        ? setSearchBarLocation(location)
        : setSearchBarProfileLocation(location);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/?search=${query}`,
        config
      );
      setSearchResult(response.data);
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

  const logout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>MQSocial</span>
          </Link>
          <WbSunnyOutlinedIcon />
          {isProfilePage && (
            <div className="searchProfile" ref={searchBarProfile}>
              {!isSearching ? (
                <div className="messenger" onClick={() => setIsSearching(true)}>
                  <SearchIcon className="messengerIcon" />
                </div>
              ) : (
                <div className="search">
                  <SearchOutlinedIcon className="searchIcon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleChange(e)}
                    value={query}
                    onClick={() => setOpenSearch(true)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {!isProfilePage && (
          <div className="center" ref={searchBar}>
            <div className="search">
              <SearchOutlinedIcon className="searchIcon" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e)}
                value={query}
                onClick={() => setOpenSearch(true)}
              />
            </div>
          </div>
        )}

        <div className="right">
          <div className="messenger">
            <ChatBubbleIcon className="messengerIcon" />
          </div>
          <div className="messenger">
            <NotificationsIcon className="notificationIcon" />
          </div>
          {/* <img
          src={
            currentUser.avatar ? currentUser.avatar : handleNoAva(currentUser)
          }
          alt=""
          className="avatar"
        /> */}
          <Menu>
            <MenuButton as={Button} className="avaButton">
              <Avatar
                size="sm"
                cursor="pointer"
                name=""
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : handleNoAva(currentUser)
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      {isProfilePage ? (
        <Search
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          open={openSearch}
          setOpen={setOpenSearch}
          location={searchBarProfileLocation}
          isProfilePage={isProfilePage}
          query={query}
          setQuery={setQuery}
        />
      ) : (
        <Search
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          open={openSearch}
          setOpen={setOpenSearch}
          location={searchBarLocation}
          isProfilePage={isProfilePage}
          query={query}
          setQuery={setQuery}
        />
      )}
    </div>
  );
};

export default Navbar;
