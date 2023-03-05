
import React, { useEffect, useContext } from "react";
import Login from "../../components/login/Login";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./homepage.css"
import axios from "axios";

const Homepage = () => {
  const { currentUser, setCurrentUser, token } = useContext(AuthContext);
  const toast = useToast();
  const history = useHistory()
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const refetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${currentUser._id}`,
        config
      );
      setCurrentUser(response.data.user)
    } catch (error) {
      toast({
        title: "An error occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    refetchCurrentUser();
    return () => {
      controller.abort();
    }
  }, [history]) 

  useEffect(() => {
    document.title = `MQSocial`
  }, [])

  return (
    <div className="homepage">
      <Navbar />
      <div className="homepageBody">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Homepage;
