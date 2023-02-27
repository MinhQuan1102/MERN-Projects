import "./profileLeftbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGlobe,
  faGlobeEurope,
  faGraduationCap,
  faHeart,
  faHome,
  faMapMarkerAlt,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { hobbiesData, hobbiesIcons } from "../hobbiesData";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import EditDetails from "../editDetails/EditDetails";
import EditHobbies from "../editHobbies/EditHobbies";

const ProfileLeftbar = ({ user, own, userFriends, userPhotos }) => {
  const { currentUser, token, handleNoAva } = useContext(AuthContext);
  const [openEditBio, setOpenEditBio] = useState(false);
  const [openEditDetails, setOpenEditDetails] = useState(false);
  const [openEditHobbies, setOpenEditHobbies] = useState(false);
  const [bioDescription, setBioDescription] = useState(currentUser.desc);
  const toast = useToast();
  const history = useHistory();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRelationshipDisplay = (num) => {
    switch (num) {
      case 1:
        return "Single";
      case 2:
        return "In a relationship";
      case 3:
        return "Complicated";
      case 4:
        return "Married";
    }
  };

  const handleEditBio = async () => {
    try {
      if (!bioDescription) {
        toast({
          title: "Please enter your Bio description",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      const newBioDesc = {
        userId: user._id,
        desc: bioDescription,
      };
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        newBioDesc,
        config
      );
      toast({
        title: "Edit bio successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "An error occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const handleSwitchProfile = (user) => {
    history.push(`/profile/${user._id}`);
    window.location.reload();
  };

  return (
    <div className="profileLeftbar">
      {user && (
        <div className="profileLeftbarContainer">
          <div className="aboutInfo">
            <h4 className="aboutTitle">Intro</h4>
            <p className="bioText">{user.desc ? user.desc : ""}</p>
            {own && (
              <>
                <div className={openEditBio ? "editBio" : "editBio hide"}>
                  <input
                    type="text"
                    placeholder="Describe who you are"
                    className="inputbox"
                    value={bioDescription}
                    onChange={(e) => setBioDescription(e.target.value)}
                    maxLength="101"
                  />
                  <p className="lengthText">
                    <span className="lengthCount">
                      {101 - bioDescription.length}
                    </span>{" "}
                    {bioDescription.length === 100 ? "character" : "characters"}{" "}
                    remaining
                  </p>
                  <div className="publicIcon">
                    <div className="icons">
                      <FontAwesomeIcon
                        icon={faGlobeEurope}
                        className="publicIcon"
                      />
                      <p> Public</p>
                    </div>
                    <div className="buttons">
                      <button
                        className="cancelBtn btn"
                        onClick={() => setOpenEditBio(false)}
                      >
                        Cancel
                      </button>
                      <button className="saveBtn btn" onClick={handleEditBio}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="editBioBtn btn"
                  onClick={() => setOpenEditBio(!openEditBio)}
                >
                  {user.desc !== "" ? "Edit bio" : "Add bio"}
                </button>
              </>
            )}
            <ul>
              {user.workAt && (
                <li>
                  <FontAwesomeIcon icon={faBriefcase} className="bioIcon" />
                  <p>
                    Works at <span>{user.workAt}</span>
                  </p>
                </li>
              )}
              {user.wentTo.length !== 0 && (
                <li>
                  <FontAwesomeIcon icon={faGraduationCap} className="bioIcon" />
                  <p>
                    Went to <span>{user.wentTo}</span>
                  </p>
                </li>
              )}
              {user.livesIn && (
                <li>
                  <FontAwesomeIcon icon={faHome} className="bioIcon" />
                  <p>
                    Lives in <span>{user.livesIn}</span>
                  </p>
                </li>
              )}
              {user.from && (
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="bioIcon" />
                  <p>
                    From <span>{user.from}</span>
                  </p>
                </li>
              )}

              <li>
                <FontAwesomeIcon icon={faHeart} className="bioIcon" />
                <p>{handleRelationshipDisplay(user.relationship)}</p>
              </li>
              {user.website && (
                <li>
                  <FontAwesomeIcon icon={faGlobe} className="bioIcon" />
                  <p>
                    <span>{user.website}</span>
                  </p>
                </li>
              )}
              <li>
                <FontAwesomeIcon icon={faWifi} className="bioIcon" />
                <p>{`${user.followings.length} ${
                  user.followings.length > 1 ? "followings" : "following"
                }`}</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faWifi} className="bioIcon" />
                <p>{`${user.followers.length} ${
                  user.followers.length > 1 ? "followers" : "follower"
                }`}</p>
              </li>
            </ul>
            {own && (
              <button
                className="editBioBtn btn"
                onClick={() => setOpenEditDetails(true)}
              >
                Edit details
              </button>
            )}
            <EditDetails
              openEditDetails={openEditDetails}
              setOpenEditDetails={setOpenEditDetails}
              user={user}
              handleRelationshipDisplay={handleRelationshipDisplay}
            />

            <div className="hobbies">
              {user.hobbies.map((hobby, i) => (
                <span key={i}>
                  {hobbiesIcons(hobby)}
                  {"  "}
                  {hobby}
                </span>
              ))}
            </div>
            {own && (
              <button
                className="editBioBtn btn"
                onClick={() => setOpenEditHobbies(true)}
              >
                {user.hobbies.length > 0 ? "Edit hobbies" : "Add hobbies"}
              </button>
            )}
          </div>
          <EditHobbies
            openEditHobbies={openEditHobbies}
            setOpenEditHobbies={setOpenEditHobbies}
            user={user}
          />

          <div className="boxDesign imageSite">
            <span>Photos</span>
            <div className="seeAllImages">See All Photos</div>
            <div className="images">
              {userPhotos
                .slice(0, 9)
                .map((photo, i) => (
                  <div className="image" key={i}>
                    <img src={photo} alt="" />
                  </div>
                ))}
            </div>
          </div>

          <div className="boxDesign friendSite">
            <span className="friendTitle">
              Friends <br />
              <p>
                <span>{userFriends.length}</span> friends
              </p>
            </span>
            <div className="seeAllImages">See All Friends</div>
            <div className="images">
              {userFriends.slice(0, 9).map((friend, i) => (
                <div
                  className="image"
                  key={i}
                  onClick={() => handleSwitchProfile(friend)}
                >
                  <img
                    src={friend.avatar ? friend.avatar : handleNoAva(friend)}
                    alt=""
                  />
                  <p>{friend.fullName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLeftbar;
