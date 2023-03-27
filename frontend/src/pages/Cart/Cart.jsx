import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/Customer/BreadCrumb/BreadCrumb";
import CartProduct from "../../components/Customer/CartProduct/CartProduct";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { formatNumber } from "../../components/longFunctions";
import "./cart.css";
import { CustomerContext } from "../../context/CustomerContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { BACKEND_URL, config } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0)
  const handleQuantityChange = () => {
    const newTotalPrice = products.reduce((accumulator, product) => {
      return accumulator + product.product.price * product.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
    console.log(totalPrice)
  };
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/customer/cart`,
        config
      );
      setProducts(data.data);
    } catch (error) {}
  };
  console.log(totalPrice)
  useEffect(() => {
    fetchCart();
    handleQuantityChange();
  }, []);

  return (
    <div className="cart">
      <BreadCrumb title="Cart" />

      <div className="cartContainer">
        <div className="cartBody">
          <table>
            <thead>
              <tr className="cartProductTitle">
                <td className="cartProductName">Product</td>
                <td className="cartProductPrice">Price</td>
                <td className="cartProductQuantity">Quantity</td>
                <td className="cartProductTotal">Total</td>
                <td className="cartProductDelete"></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartProduct
                  product={product.product}
                  productQuantity={product.quantity}
                  key={product.id}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </tbody>
          </table>

          {/* <ul className="cartItems">
            {products.map((product) => (
              <CartProduct
                product={product.product}
                productQuantity={product.quantity}
                key={product.id}
              />
            ))}
          </ul> */}
        </div>
        <div className="cartTotalPrice">
          <div className="cartTotalPriceContainer">
            <h2 className="subtotal">{`Subtotal: ₫${formatNumber(
              totalPrice
            )}`}</h2>
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
