import React, { useContext } from "react";
import "./rightbar.css";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { AuthContext } from "../../context/AuthContext";

const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="rightbar">
      {currentUser && (
        <div className="rightbarContainer">
          <div className="birthday">
            <span className="title">Birthdays</span>
            <div className="birthdayInfo">
              <CardGiftcardOutlinedIcon />
              <span className="birthdayText">
                <b>Do Minh Quan</b>'s birthday is today
              </span>
            </div>
          </div>
          <div className="onlineFriends">
            <span className="title">Contacts</span>
            <div className="user">
              {currentUser.friends.map((friend) => (
                <div className="userInfo" key={friend._id}>
                  <img src={friend.avatar} alt="" />
                  <div className="online"></div>
                  <span>{friend.fullName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rightbar;
