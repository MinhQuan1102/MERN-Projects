import { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CartProduct from "../../components/CartProduct/CartProduct";
import "./cart.css";

const Cart = () => {
  return (
    <div className="cart">
      <BreadCrumb title="Cart" />

      <div className="cartContainer">
        <div className="cartBody">
          <div className="cartProductTitle">
            <div className="cartProductName">Product</div>
            <div className="cartProductPrice">Price</div>
            <div className="cartProductQuantity">Quantity</div>
            <div className="cartProductTotal">Total</div>
          </div>
          <ul className="cartItems">
            <CartProduct />
            <CartProduct />
            <CartProduct />
          </ul>
        </div>
        <div className="cartTotalPrice">
          <div className="cartTotalPriceContainer">
            <h2 className="subtotal">Subtotal: $120</h2>
            <span>Taxes and shipping calculated at checkout</span>
            <Link to="/checkout">
              <button className="checkoutBtn">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
