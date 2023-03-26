import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./featuredProduct.css";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { BACKEND_URL, currentUser } = useContext(AuthContext);
  console.log(BACKEND_URL);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(currentUser);
  return (
    <div className="featuredProduct">
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              onClick={() => history.push(`/product/${product.id}`)}
            >
              <div className="singleProduct">
                <img
                  src={product.images[0]}
                  alt="product"
                  className="productImage"
                />
                <div className="productInfo">
                  <div className="productTitle">
                    <h2 className="productName">{`${product.name.substring(
                      0,
                      35
                    )} ${product.name.length > 35 ? "..." : ""}`}</h2>
                  </div>
                  <span className="productPrice">{`đ${product.price}`}</span>

                  <span className="productDesc">
                    {`${product.description.substring(0, 100)} ${
                      product.description.length > 100 ? "..." : ""
                    }`}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
