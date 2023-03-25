import React, { useContext, useState, useEffect, useRef } from "react";
import "./navbar.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../../images/compare.svg";
import logo from "../../../images/image-removebg-preview.png";
import wishlist from "../../../images/wishlist.svg";
import user from "../../../images/user.svg";
import cart from "../../../images/cart.svg";
import menu from "../../../images/menu.svg";
import { AuthContext } from "../../../context/AuthContext";
import Search from "../Search/Search";
import CartPreview from "../CartPreview/CartPreview";

const Navbar = () => {
  const { currentUser, setCurrentUser, setRole } = useContext(AuthContext);

  const [openSetting, setOpenSetting] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCartPreview, setOpenCartPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  return (
    <>
      <div className="navbar">
        <div className="navbarContainer">
          <div className="navbarLogo">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="navbarSearch">
            <div className="input-group">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setOpenSearch(true)}
              />
              <span
                className="input-group-text p-3"
                id="basic-addon2"
                style={{ borderRadius: "0 5px 5px 0" }}
              >
                <BsSearch className="fs-6" />
              </span>
              <Search open={openSearch} setOpen={setOpenSearch} />
            </div>
          </div>
          <div className="navbarMenu">
            <Link to="/wishlist" className="">
              <div className="navbarWishlist">
                <img src={wishlist} alt="wishlist" />
                <p className="wishlistText">
                  Favourite <br /> wishlist
                </p>
              </div>
            </Link>
            {!currentUser && (
              <div>
                <Link
                  to="/login"
                  className="d-flex align-items-center gap-10 text-white"
                >
                  <img src={user} alt="user" />
                  <p className="mb-0">Log in</p>
                </Link>
              </div>
            )}
            {!currentUser && (
              <div>
                <Link
                  to="/register"
                  className="d-flex align-items-center gap-10 text-white"
                >
                  <img src={user} alt="user" />
                  <p className="mb-0">Register</p>
                </Link>
              </div>
            )}
            <Link
              to="/cart"
              className="d-flex align-items-center gap-10 text-white"
              style={{ position: "relative" }}
              onMouseOver={() => setOpenCartPreview(true)}
              onMouseLeave={() => setOpenCartPreview(false)}
            >
              <div>
                <img src={cart} alt="cart" />
              </div>
              <CartPreview
                open={openCartPreview}
                setOpen={setOpenCartPreview}
              />
            </Link>
            {currentUser && (
              <div className="userSetting">
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="userAvatar"
                  onMouseOver={() => setOpenSetting(true)}
                  onMouseLeave={() => setOpenSetting(false)}
                />
                {openSetting && (
                  <ul
                    className="userOptions"
                    onMouseOver={() => setOpenSetting(true)}
                    onMouseLeave={() => setOpenSetting(false)}
                  >
                    <li
                      className="option"
                      onClick={() => history.push("/account/profile")}
                    >
                      My Account
                    </li>
                    <li
                      className="option"
                      onClick={() => history.push("/account/address")}
                    >
                      My Address
                    </li>
                    <li
                      className="option"
                      onClick={() => history.push("/account/password")}
                    >
                      Change Password
                    </li>
                    <li className="option" onClick={() => {setCurrentUser(null); setRole("CUSTOMER")}}>
                      Log out
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
