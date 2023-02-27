import {
  Box,
  Container,
  Tab,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../../components/login/Login";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./homepage.css"

const Homepage = () => {
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
