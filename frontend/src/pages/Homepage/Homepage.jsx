import React from "react";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepageContainer">
        <div className="homepageBody">
          <FeaturedProduct />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
