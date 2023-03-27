import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./cartPreview.css";
import { formatNumber } from "../../longFunctions";
import { Link, useHistory } from "react-router-dom";

const CartPreview = ({ open, setOpen, products }) => {
  const history = useHistory();


  return (
    <div
      className={open ? "cartPreview" : "cartPreview"}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="cartPreviewContainer">
        <div className="cartPreviewHeader">Recently added products</div>
        <div className="cartPreviewProducts">
          <ul>
            {products.slice(0, 10).map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  history.push(`/product/${item.product.id}`);
                  setOpen(false);
                }}
              >
                {/* <Link to={`/product/${item.product.id}`}> */}
                <div className="cartProductLeft">
                  <img src={item.product.images[0]} alt="" />
                  <span>{item.product.name}</span>
                </div>
                <div className="cartProductRight">
                  <span className="price-symbol">₫</span>
                  {formatNumber(item.product.price)}
                </div>
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="seeCartBtn">
          <button
            className="button"
            onClick={() => {
              history.push("/cart");
              setOpen(false);
            }}
          >
            View your cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
