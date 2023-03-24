import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./featuredProduct.css";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { BACKEND_URL } = useContext(AuthContext);
  console.log(BACKEND_URL)
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/products`
      );
      setProducts(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="featuredProduct">
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          {products.map((product) => (
            <li key={product.id} onClick={() => history.push(`/product/${product.id}`)}>
              <div className="singleProduct">
                <img
                  src={product.image}
                  alt="product"
                  className="productImage"
                />
                <div className="productInfo">
                  <div className="productTitle">
                    <h2 className="productName">{product.name}</h2>
                    <span className="productCategory">{product.category}</span>
                  </div>

                  <span className="productDesc">
                    {product.description}
                  </span>
                </div>
                <span className="productPrice">{`đ${product.price}`}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
