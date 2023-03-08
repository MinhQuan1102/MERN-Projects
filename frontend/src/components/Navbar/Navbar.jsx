import React, { useContext, useState, useEffect, useRef } from "react";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../images/compare.svg";
import logo from "../../images/image-removebg-preview.png";
import wishlist from "../../images/wishlist.svg";
import user from "../../images/user.svg";
import cart from "../../images/cart.svg";
import menu from "../../images/menu.svg";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [openSetting, setOpenSetting] = useState(false);

  const userSetting = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (userSetting.current && !userSetting.current.contains(event.target)) {
        setOpenSetting(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userSetting]);

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
              />
              <span className="input-group-text p-3" id="basic-addon2">
                <BsSearch className="fs-6" />
              </span>
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
            >
              <div>
                <img src={cart} alt="cart" />
              </div>
            </Link>
            {currentUser && (
              <div className="userSetting">
                <img
                  src="https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-1/273210834_3086464761611742_3914305251108406206_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=I26m5w5wnrgAX-ix0Ix&_nc_ht=scontent.fhan3-1.fna&oh=00_AfAtb9eA1nrE-TUbLR388LSFFqzJnwfoJXS-15zq6icysA&oe=6401D8C1"
                  alt=""
                  className="userAvatar"
                  onClick={() => setOpenSetting(!openSetting)}
                />
                {openSetting && (
                  <ul className="userOptions" ref={userSetting}>
                    <li className="option">My Account</li>
                    <li className="option" onClick={() => setCurrentUser(null)}>
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
