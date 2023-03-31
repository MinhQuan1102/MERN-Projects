import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./featuredProduct.css";
import { formatNumber } from "../../longFunctions";
import SingleProduct from "../SingleProduct/SingleProduct";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { BACKEND_URL, currentUser } = useContext(AuthContext);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="featuredProduct">
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          {products.map((product) => (
            <SingleProduct product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
