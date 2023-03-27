import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../longFunctions";
import "./cartProduct.css";
import { CustomerContext } from "../../../context/CustomerContext";

const CartProduct = ({ product, productQuantity, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(productQuantity);
  const { totalPrice, setTotalPrice } = useContext(CustomerContext);

  const handleQuantity = (amount) => {
    setQuantity((prev) => prev + amount);
  };

  useEffect(() => {
    handleQuantityChange();
  }, [quantity]);
  return (
    <tr>
      <td className="cartProductName">
        <img src={product.images[0]} alt="" />
        <h2>{product.name}</h2>
      </td>
      <td className="cartProductPrice">
        <span className="price-symbol">₫</span>
        {formatNumber(product.price)}
      </td>
      <td className="cartProductQuantity">
        <div className="productQuantityContainer">
          <div className="minus" onClick={() => handleQuantity(-1)}>
            -
          </div>
          <div className="quantity">{quantity < 1 ? 1 : quantity}</div>
          <div className="plus" onClick={() => handleQuantity(1)}>
            +
          </div>
        </div>
      </td>
      <td className="cartProductTotal">
        <span className="price-symbol">₫</span>
        {formatNumber(product.price * quantity)}
      </td>
      <td className="cartProductDelete">
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
};

export default CartProduct;
