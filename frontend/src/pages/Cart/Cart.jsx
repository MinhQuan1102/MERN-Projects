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
  const [storeProducts, setStoreProducts] = useState([]);
  const { BACKEND_URL, config } = useContext(AuthContext);

  const [total, setTotal] = useState(0);

  const totalPrice = storeProducts.reduce((accumulator, currentValue) => {
    const itemTotal = currentValue.items.reduce((itemAccumulator, item) => {
      return itemAccumulator + item.product.price * item.quantity;
    }, 0);
    return accumulator + itemTotal;
  }, 0)
  console.log(storeProducts);
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/customer/cart`,
        config
      );
      setStoreProducts(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCart();
    // handleQuantityChange();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="cart">
      <BreadCrumb title="Cart" />

      <div className="cartContainer">
        <div className="cartBody">
          {storeProducts &&
            storeProducts.map((store) => (
              <div className="cartStore" key={store.id}>
                <div className="storeInfo">
                  <img src={store.store.avatar} alt="" />
                  <h2>{store.store.name}</h2>
                </div>
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
                    {store.items.map((product) => (
                      <CartProduct
                        product={product.product}
                        productQuantity={product.quantity}
                        key={product.id}
                        fetchCart={fetchCart}
                        setTotal={setTotal}
                        // handleQuantityChange={handleQuantityChange}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          {!storeProducts && (
            <div>
              <span>Your cart is empty</span>
            </div>
          )}
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
        {storeProducts && (
          <div className="cartTotalPrice">
            <div className="cartTotalPriceContainer">
              <h2 className="subtotal">{`Subtotal: ₫${formatNumber(
                total
              )}`}</h2>
              <span>Taxes and shipping calculated at checkout</span>
              <Link to="/checkout">
                <button className="checkoutBtn">Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
