import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../../images/newsletter.png";
const Footer = () => {
  return (
    <div className="footer" style={{ position: "sticky", bottom: "0px", left: "0"}}>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Hanoi University
                </address>
                <a
                  href="tel:+84 1234567890"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +84 12345678910JQK
                </a>
                <a
                  href="mailto:meomeo@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  gaugau@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link to="" className="text-white py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">About Us</Link>
                <Link to="" className="text-white py-2 mb-1">Faq</Link>
                <Link to="" className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">Laptops</Link>
                <Link to="" className="text-white py-2 mb-1">Headphones</Link>
                <Link to="" className="text-white py-2 mb-1">Tablets</Link>
                <Link to="" className="text-white py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    
    </div>
  );
};

export default Footer;