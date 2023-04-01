import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./featuredProduct.css";
import { formatNumber } from "../../longFunctions";
import SingleProduct from "../SingleProduct/SingleProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const { BACKEND_URL, currentUser } = useContext(AuthContext);
  const featuredProduct = useRef();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/products?page=${pageNumber - 1}`
      );
      setProducts(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {}
  };
  const pageNumberList = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumberList.push(
      <li
        key={i}
        onClick={() => {
          setPageNumber(i + 1);
          handleScroll();
        }}
      >
        <div className={pageNumber === i + 1 ? "currentPage" : ""}>{i + 1}</div>
      </li>
    );
  }
  const handleScroll = () => {
    featuredProduct.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleClickPrev = () => {
    setPageNumber((prev) => (prev === 1 ? 1 : prev - 1));
    handleScroll();
  };

  const handleClickNext = () => {
    setPageNumber((prev) => (prev === totalPages ? prev : prev + 1));
    handleScroll();
  };
  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  return (
    <div className="featuredProduct" ref={featuredProduct}>
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          {products.map((product) => (
            <SingleProduct product={product} />
          ))}
        </ul>
        <div className="productNav">
          <ul>
            <li>
              <button className="button" onClick={() => handleClickPrev()}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Previous</span>
              </button>
            </li>
            {pageNumberList}
            <li>
              <button className="button" onClick={() => handleClickNext()}>
                <span>Next</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
