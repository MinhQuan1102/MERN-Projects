import React, { useState, useContext } from "react";
import "./editHobbies.css";
import { hobbiesData, hobbiesIcons } from "../hobbiesData";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const EditHobbies = ({ openEditHobbies, setOpenEditHobbies, user }) => {
  const { currentUser, token } = useContext(AuthContext);
  const [hobbies, setHobbies] = useState(user.hobbies);
  const toast = useToast();

  const handleAddHobby = (hobby, e) => {
    if (hobby == "") return;
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
      e.target.parentElement.classList.remove("selected");
      return;
    }
    setHobbies([...hobbies, hobby]);
    e.target.parentElement.classList.add("selected");
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleClick = async () => {
    try {
      const newHobbies = {
        hobbies,
        userId: user._id,
      };
      const response = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        newHobbies,
        config
      );
      console.log(response.data);
      toast({
        title: "Edit hobbies successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setOpenEditHobbies(false);
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

  return (
    <div className={openEditHobbies ? "editHobbies" : "editHobbies hide"}>
      {user && (
        <>
          <div className="header">
            <img
              src="https://image.shutterstock.com/image-vector/people-hobby-icons-around-giant-260nw-1777018568.jpg"
              alt=""
              className="hobbiesImg"
            />
            <p>Edit hobbies</p>
            <span className="smallDesc">
              What do you love to do? Choose from the popular hobbies below or
              add others.
            </span>
            <FontAwesomeIcon
              icon={faTimes}
              className="closeBtn"
              onClick={() => setOpenEditHobbies(false)}
            />
          </div>
          <div className="body">
            <div className="hobbiesTitle">Recommended hobbies</div>
            <div className="hobbyItems">
              {hobbiesData.map((hobby) => (
                <div
                className={hobbies.includes(hobby.id) ? "hobbyItem selected" : "hobbyItem"}
                onClick={(e) => handleAddHobby(e.target.id, e)}
                key={hobby.id}
              >
                {hobbiesIcons(hobby.id)}
                <div className="hobbyDesc" id={hobby.id}>
                  {hobby.desc}
                </div>
              </div>
              ))}
            </div>
          </div>
          <div className="audienceButtons">
            <button
              className="cancel"
              onClick={() => setOpenEditHobbies(false)}
            >
              Cancel
            </button>
            <button className="done" onClick={handleClick}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditHobbies;
