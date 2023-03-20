import React from "react";
import { Link } from "react-router-dom";
import "./featuredProduct.css";

const FeaturedProduct = () => {
  return (
    <div className="featuredProduct">
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          <li>
            <div className="singleProduct">
              <img
                src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                alt="product"
                className="productImage"
              />
              <div className="productInfo">
                <div className="productTitle">
                  <h2 className="productName">Sục siêu vip</h2>
                  <span className="productCategory">Dép</span>
                </div>

                <span className="productDesc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  odio facere totam tenetur repellat perferendis molestiae alias
                  aspernatur ullam tempore!
                </span>
              </div>
              <span className="productPrice">20k</span>
            </div>
          </li>
          <li>
            <div className="singleProduct">
              <img
                src="https://down-vn.img.susercontent.com/file/7750ae1d3a4b4ba05da615d168887f22"
                alt="product"
                className="productImage"
              />
              <div className="productInfo">
                <div className="productTitle">
                  <h2 className="productName">Áo thun có cổ</h2>
                  <span className="productCategory">Áo</span>
                </div>

                <span className="productDesc">Áo hàng chất lượng cao</span>
              </div>
              <span className="productPrice">20k</span>
            </div>
          </li>
          <li>
            <div className="singleProduct">
              <img
                src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                alt="product"
                className="productImage"
              />
              <div className="productInfo">
                <div className="productTitle">
                  <h2 className="productName">Sục siêu vip</h2>
                  <span className="productCategory">Dép</span>
                </div>

                <span className="productDesc">Lorem ipsum!</span>
              </div>
              <span className="productPrice">20k</span>
            </div>
          </li>
          <li>
            <div className="singleProduct">
              <img
                src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                alt="product"
                className="productImage"
              />
              <div className="productInfo">
                <div className="productTitle">
                  <h2 className="productName">Sục siêu vip</h2>
                  <span className="productCategory">Dép</span>
                </div>

                <span className="productDesc">
                  Lorem ipsum!
                </span>
              </div>
              <span className="productPrice">20k</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
