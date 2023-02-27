import { useState, useContext } from "react";
import "./leftbar.css";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StoreIcon from "@mui/icons-material/Store";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Leftbar = () => {
  const { currentUser, handleNoAva } = useContext(AuthContext);
  const currentUserId = currentUser._id

  return (
    <div className="leftbar">
      <div className="leftBarContainer">
        <div className="menu">
          <div className="item">
            <HomeIcon className="icon" />
            <span>Home</span>
          </div>
          <Link to={`/profile/${currentUserId}`}>
            <div className="item">
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : handleNoAva(currentUser)
                }
                alt=""
              />
              <span>{currentUser.fullName}</span>
            </div>
          </Link>
        </div>

        <hr className="hr" />
        <div className="menu">
          <div className="item">
            <OndemandVideoIcon className="icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <StoreIcon className="icon" />
            <span>Market</span>
          </div>
        </div>

        <hr className="hr" />
        <div className="menu">
          <span>Shortcuts</span>
          <div className="item">
            <OndemandVideoIcon />
            <span>Watch</span>
          </div>
          <div className="item">
            <StoreIcon />
            <span>Market</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
