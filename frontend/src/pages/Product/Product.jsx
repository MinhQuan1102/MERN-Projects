import { useState } from "react";
import BreadCrumb from "../../components/Customer/BreadCrumb/BreadCrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMessage,
  faShop,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import ReactImageZoom from "react-image-zoom";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./product.css";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const props = {
    width: 600,
    height: 660,
    zoomWidth: 600,
    img: "https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8",
  };

  const handleQuantity = (amount) => {
    setQuantity((prev) => prev + amount);
  };

  return (
    <div className="product">
      <BreadCrumb title="Product" />

      <div className="productContainer">
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
                <ul>
                  <li>
                    <h4>Type: </h4>
                    <span>Dép</span>
                  </li>
                  <li>
                    <h4>Brands: </h4>
                    <span>Gu chi`</span>
                  </li>
                  <li>
                    <h4>Category: </h4>
                    <span>Dép</span>
                  </li>
                  <li>
                    <h4>Availability: </h4>
                    <span>In stock</span>
                  </li>
                  <li>
                    <h4 className="quantityText">Quantity: </h4>
                    <div className="productQuantity">
                      <div className="minus" onClick={() => handleQuantity(-1)}>
                        -
                      </div>
                      <div className="quantity">
                        {quantity < 1 ? 1 : quantity}
                      </div>
                      <div className="plus" onClick={() => handleQuantity(1)}>
                        +
                      </div>
                    </div>
                  </li>
                  <li className="productButtons">
                    <button className="addToCartBtn">
                      <FontAwesomeIcon icon={faCartPlus} />
                      <span>Add to cart</span>
                    </button>
                    <button className="buyNowBtn">Buy it now</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* store Infomation */}
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

        {/* product description */}
        <div className="productDesc">
          <span className="descText">Description</span>
          <div className="productDescContainer">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            aut tempora, quam dicta a odio quas amet illum ab odit!
          </div>
        </div>

        <div className="productReview">
          <span className="reviewText">Review</span>
          <div className="productReviewContainer">
            <div className="customerReviews">
              <ul>
                <li>
                  <div className="reviewLeft">
                    <img
                      src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9fnPSj&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA92m10XiplbJb0QeM-d8Rw0HB1neXeo_mJdUsJfh3JqQ&oe=640D4AC3"
                      alt=""
                    />
                  </div>
                  <div className="reviewRight">
                    <div className="customerName">Minh Quan</div>
                    <div className="customerVote">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="customerReview">nhu cut'</div>
                    <div className="customerImages"></div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="reviewLeft">
                    <img
                      src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9fnPSj&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA92m10XiplbJb0QeM-d8Rw0HB1neXeo_mJdUsJfh3JqQ&oe=640D4AC3"
                      alt=""
                    />
                  </div>
                  <div className="reviewRight">
                    <div className="customerName">Minh Quan</div>
                    <div className="customerVote">
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="customerReview">nhu cut'</div>
                    <div className="customerImages"></div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <div className="reviewLeft">
                    <img
                      src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9fnPSj&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA92m10XiplbJb0QeM-d8Rw0HB1neXeo_mJdUsJfh3JqQ&oe=640D4AC3"
                      alt=""
                    />
                  </div>
                  <div className="reviewRight">
                    <div className="customerName">Minh Quan</div>
                    <div className="customerVote">
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="customerTime">1h ago</div>
                    <div className="customerReview">nhu cut'</div>
                    <div className="customerImages">
                      <img
                        src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                        alt="reviewImg"
                      />
                      <img
                        src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                        alt="reviewImg"
                      />
                      <img
                        src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                        alt="reviewImg"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* write review */}
            <div className="writeReview">
              <div className="writeReviewText">Write your review</div>
              <div className="reviewVote">
                <ReactStars
                  count={5}
                  size={24}
                  value={0}
                  edit={true}
                  activeColor="#ffd700"
                />
              </div>
              <textarea
                name="review"
                id=""
                cols="30"
                rows="10"
                placeholder="Comment..."
              ></textarea>
              <div className="submitReview">
                <button className="submitReviewBtn">Submit review</button>
              </div>
            </div>
          </div>

          {/* store other product */}
          <div className="storeOtherProduct">
            <div className="otherProductText">MQShop's other products</div>
            <div className="storeOtherProductContainer">
              <ul>
                <li>
                  <Link to="/product/1" className="singleProduct">
                    <img
                      src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                      alt="product"
                      className="productImage"
                    />
                    <div className="productTitle">
                      <h2 className="productName">Sục siêu vip</h2>
                      <span className="productCategory">Dép</span>
                    </div>
                    <span className="productPrice">20k</span>
                  </Link>
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
                  <span className="productPrice">20k</span>
                </li>
              </ul>
            </div>
          </div>

          {/* related products */}
          <div className="storeOtherProduct">
            <div className="otherProductText">Related Products</div>
            <div className="storeOtherProductContainer">
              <ul>
                <li>
                  <Link to="/product/1" className="singleProduct">
                    <img
                      src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                      alt="product"
                      className="productImage"
                    />
                    <div className="productTitle">
                      <h2 className="productName">Sục siêu vip</h2>
                      <span className="productCategory">Dép</span>
                    </div>
                    <span className="productPrice">20k</span>
                  </Link>
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
                  <span className="productPrice">20k</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
