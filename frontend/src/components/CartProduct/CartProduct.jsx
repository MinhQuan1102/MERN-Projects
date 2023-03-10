import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./cartProduct.css";

const CartProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (amount) => {
    setQuantity((prev) => prev + amount);
  };
  return (
    <li className="cartProduct">
      <div className="cartProductName">
        <div className="productImage">
          <img
            src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
            alt=""
          />
        </div>
        <div className="productInfo">
          <h2>Sục siêu vip</h2>
          <span>Brand: Gucci</span>
        </div>
      </div>
      <div className="cartProductPrice">$20</div>
      <div className="cartProductQuantity">
        <div className="productQuantity">
          <div className="minus" onClick={() => handleQuantity(-1)}>
            -
          </div>
          <div className="quantity">{quantity < 1 ? 1 : quantity}</div>
          <div className="plus" onClick={() => handleQuantity(1)}>
            +
          </div>
        </div>
        <div className="trashCan">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
      <div className="cartProductTotal">$40</div>
    </li>
  );
};

export default CartProduct;
