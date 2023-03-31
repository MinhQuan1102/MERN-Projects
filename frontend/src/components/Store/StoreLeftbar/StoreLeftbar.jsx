import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import "./storeLeftbar.css";
import { StoreContext } from "../../../context/StoreContext";
import { useHistory, useLocation } from "react-router-dom";
import { handleChooseOption, handleNavigateOption } from "./storeLeftbarLogic";

const StoreLeftbar = () => {
  const [openOrderManagement, setOpenOrderManagement] = useState(false);
  const [openProductManagement, setOpenProductManagement] = useState(false);
  const [openPromotionManagement, setOpenPromotionManagement] = useState(false);
  const [openMyStore, setOpenMyStore] = useState(false);
  const { option, setOption } = useContext(StoreContext);
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    setOption(handleNavigateOption(location.pathname));
  }, [location]);

  return (
    <div className="storeLeftbar">
      <div className="storeLeftbarContainer">
        <div className="orderSite">
          <div
            className="heading"
            onClick={() => setOpenOrderManagement(!openOrderManagement)}
          >
            <span>Order Management</span>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={
                openOrderManagement ? "openOption" : "openOption rotate"
              }
            />
          </div>

          <ul className={openOrderManagement ? "options selected" : "options"}>
            <li
              className={option === "All Orders" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("All Orders", setOption, history)
              }
            >
              All orders
            </li>
            <li
              className={option === "Canceled Orders" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("Canceled Orders", setOption, history)
              }
            >
              Canceled orders
            </li>
          </ul>
        </div>
        <div className="productSite">
          <div
            className="heading"
            onClick={() => setOpenProductManagement(!openProductManagement)}
          >
            <span>Product Management</span>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={
                openProductManagement ? "openOption" : "openOption rotate"
              }
            />
          </div>
          <ul
            className={openProductManagement ? "options selected" : "options"}
          >
            <li
              className={option === "All Products" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("All Products", setOption, history)
              }
            >
              All Products
            </li>
            <li
              className={option === "Add a Product" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("Add a Product", setOption, history)
              }
            >
              Add a Product
            </li>
          </ul>
        </div>
        <div className="promotionSite">
          <div
            className="heading"
            onClick={() => setOpenPromotionManagement(!openPromotionManagement)}
          >
            <span>Promotion Management</span>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={
                openPromotionManagement ? "openOption" : "openOption rotate"
              }
            />
          </div>
          <ul
            className={openPromotionManagement ? "options selected" : "options"}
          >
            <li
              className={option === "All Promotions" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("All Promotions", setOption, history)
              }
            >
              All Promotions
            </li>
            <li
              className={option === "Add a Promotion" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("Add a Promotion", setOption, history)
              }
            >
              Add a Promotion
            </li>
          </ul>
        </div>
        <div className="myStoreSite">
          <div className="heading" onClick={() => setOpenMyStore(!openMyStore)}>
            <span>My Store</span>
            <FontAwesomeIcon
              icon={faChevronUp}
              className={openMyStore ? "openOption" : "openOption rotate"}
            />
          </div>
          <ul className={openMyStore ? "options selected" : "options"}>
            <li
              className={option === "All Products" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("All Products", setOption, history)
              }
            >
              All Products
            </li>
            <li
              className={option === "Add a Product" ? "chosenOption" : ""}
              onClick={() =>
                handleChooseOption("Add a Product", setOption, history)
              }
            >
              Add a Product
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreLeftbar;
