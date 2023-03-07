import React from "react";
import "./featuredProduct.css";

const FeaturedProduct = () => {
  return (
    <div className="featuredProduct">
      <div className="featuredProductContainer">
        <div className="featuredTitle">Featured products</div>
        <ul>
          <li>
            <img
              src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
              alt="product"
              className="productImage"
            />
            <div className="productTitle">
              <h2 className="productName">Sục siêu vip</h2>
              <span className="productCategory">Dép</span>
            </div>

            <span className="productDesc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio
              facere totam tenetur repellat perferendis molestiae alias
              aspernatur ullam tempore!
            </span>

            <span className="productPrice">20k</span>
          </li>
          <li>
            <img
              src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
              alt="product"
              className="productImage"
            />
            <div className="productTitle">
              <h2 className="productName">Sục siêu vip</h2>
              <span className="productCategory">Dép</span>
            </div>

            <span className="productDesc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio
              facere totam tenetur repellat perferendis molestiae alias
              aspernatur ullam tempore!
            </span>

            <span className="productPrice">20k</span>
          </li>
          <li>
            <img
              src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
              alt="product"
              className="productImage"
            />
            <div className="productTitle">
              <h2 className="productName">Sục siêu vip</h2>
              <span className="productCategory">Dép</span>
            </div>

            <span className="productDesc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio
              facere totam tenetur repellat perferendis molestiae alias
              aspernatur ullam tempore!
            </span>

            <span className="productPrice">20k</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
