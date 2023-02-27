import React, { useContext, useRef, useState, useEffect } from "react";
import "./editDetails.css";
import {
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const EditDetails = ({
  handleRelationshipDisplay,
  openEditDetails,
  setOpenEditDetails,
  user,
}) => {
  const [openEditWork, setOpenEditWork] = useState(false);
  const [openEditEducation, setOpenEditEducation] = useState(false);
  const [openEditCity, setOpenEditCity] = useState(false);
  const [openEditHomeTown, setOpenEditHomeTown] = useState(false);
  const [openEditRelationship, setOpenEditRelationship] = useState(false);
  const [openEditWebsite, setOpenEditWebsite] = useState(false);
  const [openEditSocialLink, setOpenEditSocialLink] = useState(false);
  const [userDetail, setUserDetail] = useState({
    work: user.workAt,
    education: user.wentTo,
    city: user.from,
    homeTown: user.livesIn,
    relationship: user.relationship,
    website: user.website,
    socialLink: user.socialLink,
  });
  const { currentUser, token } = useContext(AuthContext)
  const toast = useToast();
  const editDetail = useRef()

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (e) => {
    setUserDetail((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      const newDetail = {
        workAt: userDetail.work,
        wentTo: userDetail.education,
        from: userDetail.city,
        livesIn: userDetail.homeTown,
        relationship: userDetail.relationship,
        website: userDetail.website,
        socialLink: userDetail.socialLink,
        userId: currentUser._id,
      };
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`, newDetail, config
      );
      toast({
        title: "Edit details successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setOpenEditDetails(false);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        editDetail.current &&
        !editDetail.current.contains(event.target)
      ) {
        setOpenEditDetails(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editDetail]);


  return (
    <div className={openEditDetails ? "editDetails" : "editDetails hide"} ref={editDetail}>
      {user && (
        <>
          <div className="header">
            <p>Edit details</p>
            <FontAwesomeIcon
              icon={faTimes}
              className="closeBtn"
              onClick={() => setOpenEditDetails(false)}
            />
          </div>
          <div className="body">
            <div className="description">
              <span className="bigDesc">Customise your Intro</span>
              <span className="smallDesc">
                Detail you select will be public
              </span>
            </div>
            <div className="content">
              <ul>
                <li>
                  <div className="detailTitle">Work</div>
                  <div className="detailBody">
                    <div className="left">
                      {openEditWork ? (
                        <input
                          type="text"
                          placeholder={
                            user.workAt ? user.workAt : "You are working for..."
                          }
                          className="inputBox"
                          value={userDetail.work}
                          id="work"
                          maxLength="101"
                          onChange={handleChange}
                        />
                      ) : (
                        <h2>{user.workAt}</h2>
                      )}
                    </div>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditWork(!openEditWork)}
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Education</div>
                  <div className="detailBody">
                    {openEditEducation ? (
                      <input
                        type="text"
                        placeholder={
                          user.wentTo.length > 1
                            ? user.wentTo[0]
                            : "You are studying in..."
                        }
                        id="education"
                        value={userDetail.education}
                        className="inputBox"
                        maxLength="101"
                        onChange={handleChange}
                      />
                    ) : (
                      <h2>{user.wentTo}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditEducation(!openEditEducation)}
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Current town/city</div>
                  <div className="detailBody">
                    {openEditCity ? (
                      <input
                        type="text"
                        placeholder={
                          user.from ? user.from : "You are living in..."
                        }
                        className="inputBox"
                        maxLength="101"
                        id="city"
                        value={userDetail.city}
                        onChange={handleChange}
                      />
                    ) : (
                      <h2>{user.from}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditCity(!openEditCity)}
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Home town</div>
                  <div className="detailBody">
                    {openEditHomeTown ? (
                      <input
                        type="text"
                        placeholder={
                          user.livesIn ? user.livesIn : "You are living at..."
                        }
                        id="homeTown"
                        className="inputBox"
                        maxLength="101"
                        value={userDetail.homeTown}
                        onChange={handleChange}
                      />
                    ) : (
                      <h2>{user.livesIn}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditHomeTown(!openEditHomeTown)}
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Relationship</div>
                  <div className="detailBody">
                    {openEditRelationship ? (
                      <input
                        type="text"
                        placeholder={handleRelationshipDisplay(
                          user.relationship
                        )}
                        id="relationship"
                        className="inputBox"
                        maxLength="101"
                        onChange={handleChange}
                      />
                    ) : (
                      <h2>{handleRelationshipDisplay(user.relationship)}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() =>
                        setOpenEditRelationship(!openEditRelationship)
                      }
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Website</div>
                  <div className="detailBody">
                    {openEditWebsite ? (
                      <input
                        type="text"
                        placeholder={
                          user.website
                            ? user.website
                            : "Your personal website..."
                        }
                        id="website"
                        onChange={handleChange}
                        className="inputBox"
                        maxLength="101"
                        value={userDetail.website}
                      />
                    ) : (
                      <h2>{user.website}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditWebsite(!openEditWebsite)}
                    />
                  </div>
                </li>
                <li>
                  <div className="detailTitle">Social links</div>
                  <div className="detailBody">
                    {openEditSocialLink ? (
                      <input
                        type="text"
                        placeholder={
                          user.socialLinks
                            ? user.socialLinks
                            : "Your social link..."
                        }
                        className="inputBox"
                        maxLength="101"
                        value={userDetail.socialLink}
                        id="socialLinks"
                        onChange={handleChange}
                      />
                    ) : (
                      <h2>{user.socialLinks}</h2>
                    )}
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="editIcon"
                      onClick={() => setOpenEditSocialLink(!openEditSocialLink)}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="audienceButtons">
              <button
                className="cancel"
                onClick={() => setOpenEditDetails(false)}
              >
                Cancel
              </button>
              <button className="done" onClick={handleClick}>Save</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditDetails;
