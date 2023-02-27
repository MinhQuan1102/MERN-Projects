import { faCaretDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profileNavbar.css";

const ProfileNavbar = () => {
  return (
    <div className="profileNavbar">
      <div className="profileNavbarContainer">
        <ul className="btnList">
          <li className="btnText active">Posts</li>
          <li className="btnText">About</li>
          <li className="btnText">Friends</li>
          <li className="btnText">Photo</li>
          <li className="btnText">Video</li>
          <li className="btnText">Likes</li>
          <li className="btnText ">
            More <FontAwesomeIcon icon={faCaretDown} className="moreIcon"/>
          </li>
        </ul>
        <div className="navBtn">
          <FontAwesomeIcon icon={faEllipsis} className="navBtnIcon"/>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
