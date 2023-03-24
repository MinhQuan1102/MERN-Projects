import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartPlus,
  faMessage,
  faShop,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import "./productDetail.css";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (amount) => {
    setQuantity((prev) => prev + amount);
  };
  return (
    <div className="productDetail">
      <div className="productBody">
        <div className="productLeft">
          <div className="productLeftContainer">
            {/* <div className="productImage">
                <ReactImageZoom {...props}/>
              </div> */}
            <img
              src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
              alt=""
            />
          </div>
        </div>
        <div className="productRight">
          <div className="productRightContainer">
            <div className="productName">
              <h2>Sục siêu vip</h2>
            </div>
            <div className="productPrice">
              <span className="price">20k</span>
              <span className="writeReviewText">Write a review</span>
            </div>
            <div className="productDescription">
              <table>
                <tbody>
                  <tr>
                    <th className="productHeading">Category</th>
                    <th className="productContent">Desp</th>
                  </tr>
                  <tr>
                    <th className="productHeading">In stock </th>
                    <th className="productContent">124</th>
                  </tr>
                  <tr>
                    <th className="productHeading">Size </th>
                    <th className="productContent">XL</th>
                  </tr>
                  <tr>
                    <th className="productHeading">Quantity </th>
                    <th className="productContent">
                      <div className="productQuantity">
                        <div
                          className="minus"
                          onClick={() => handleQuantity(-1)}
                        >
                          -
                        </div>
                        <div className="quantity">
                          {quantity < 1 ? 1 : quantity}
                        </div>
                        <div className="plus" onClick={() => handleQuantity(1)}>
                          +
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="productHeading"></th>
                    <th className="productContent productButtons">
                      <button className="addToCartBtn">
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Add to cart</span>
                      </button>
                      <button className="buyNowBtn">
                        <span>Buy Now</span>
                        <FontAwesomeIcon icon={faArrowRight} className="alternativeBuyNowIcon" />
                        <FontAwesomeIcon icon={faArrowRight} className="buyNowIcon" />
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="storeInfo">
        <div className="storeInfoContainer">
          <div className="storeLeft">
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9fnPSj&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA92m10XiplbJb0QeM-d8Rw0HB1neXeo_mJdUsJfh3JqQ&oe=640D4AC3"
              alt=""
            />
          </div>
          <div className="storeRight">
            <h3 className="storeName">MQShop</h3>
            <div className="storeButtons">
              <button className="visitStore">
                <FontAwesomeIcon icon={faShop} />
                <span>Visit store</span>
              </button>
              <button className="messageStore">
                <FontAwesomeIcon icon={faMessage} />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="productDesc">
        <span className="descText">Description</span>
        <div className="productDescContainer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aut
          tempora, quam dicta a odio quas amet illum ab odit!
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
