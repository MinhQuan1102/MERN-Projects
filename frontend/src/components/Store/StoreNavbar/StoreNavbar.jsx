import React from "react";
import "./storeNavbar.css";
import logo from "../../../images/image-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const StoreNavbar = () => {
  return (
    <div className="storeNavbar">
      <div className="storeNavbarContainer">
        <div className="storeNavbarLeft">
          <img src={logo} alt="" />
        </div>
        <div className="storeNavbarRight">
          <div className="storeInfo">
            <div className="storeImg">
              <img
                src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8rqDy8TmoFoAX_xX4nd&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDIEtbxRv7UCXG6nZqA037yGmPhJh43l71WEVdTfGgNkg&oe=641D1CC3"
                alt=""
              />
            </div>

            <span>Store name</span>
          </div>
          <div className="notification">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreNavbar;
