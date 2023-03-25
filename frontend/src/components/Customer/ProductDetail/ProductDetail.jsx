import { useState, useEffect, useContext, useRef } from "react";
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

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [mainImageWidth, setMainImageWidth] = useState(0);
  const handleQuantity = (amount) => {
    setQuantity((prev) => prev + amount);
  };
  const [imageIndex, setImageIndex] = useState(0);

  const mainImage = useRef();
  console.log(product)
  useEffect(() => {
    const handleResize = () => {
      setMainImageWidth(mainImage?.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="productDetail">
      <div className="productBody">
        <div className="productLeft">
          <div className="productLeftContainer">
            {/* <div className="productImage">
                <ReactImageZoom {...props}/>
              </div> */}
            <div className="productCurrentImage" ref={mainImage}>
              <img src={product.images[imageIndex]} alt="" />
            </div>
            <div className="productOtherImages">
              {product.images.map((image, i) => (
                <img src={image} alt="" key={i} onMouseOver={() => setImageIndex(i)}/>
              ))}
            </div>
          </div>
        </div>
        <div className="productRight">
          <div className="productRightContainer">
            <div className="productName">
              <h2>{product.name}</h2>
            </div>
            <div className="productPrice">
              <div className="price">
                <span className="price-symbol">₫</span>
                {product.price}
              </div>
              <span className="writeReviewText">Write a review</span>
            </div>
            <div className="productDescription">
              <table>
                <tbody>
                  <tr>
                    <th className="productHeading">Category</th>
                    <th className="productContent">{product.category}</th>
                  </tr>
                  <tr>
                    <th className="productHeading">In stock </th>
                    <th className="productContent">{product.quantity}</th>
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
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="alternativeBuyNowIcon"
                        />
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="buyNowIcon"
                        />
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
              src={product.store.avatar}
              alt=""
            />
          </div>
          <div className="storeRight">
            <h3 className="storeName">{product.store.name}</h3>
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
