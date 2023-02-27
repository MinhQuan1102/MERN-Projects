import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ProfileImage from "../../components/profile/profileImage/ProfileImage";
import ProfileNavbar from "../../components/profile/profileNavbar/ProfileNavbar";
import ProfileLeftbar from "../../components/profile/profileLeftBar/ProfileLeftbar";
import ProfilePosts from "../../components/profile/profilePosts/ProfilePosts";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  const { currentUser, blur, token } = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  const userId = history.location.pathname.toString().split("/")[2];
  const isOwnProfile = userId === currentUser._id;
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const pending = user?.pendingUsers.includes(currentUser._id.toString());
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          config
        );
        setUser(response.data.user);
        setUserPhotos([...response.data.user.photos.reverse()]);
        setUserFriends([...response.data.user.friends.reverse()]);
      } catch (error) {
        toast({
          title: "Cannot fetch user",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      document.title = `${user.fullName} | MQSocial`;
    }
  }, [user]);

  return (
    user && (
      <div className={blur ? "profile" : "profile"}>
        <Navbar />
        <ProfileImage
          own={isOwnProfile}
          pending={pending}
          user={user}
          userFriends={userFriends}
        />
        <ProfileNavbar />
        <div className="profileBody">
          <ProfileLeftbar
            own={isOwnProfile}
            user={user}
            userPhotos={userPhotos}
            userFriends={userFriends}
          />
          <ProfilePosts own={isOwnProfile} user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
