import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "./cartPreview.css";
import { useHistory } from "react-router-dom";

const CartPreview = ({ open, setOpen }) => {
  const [products, setProducts] = useState([]);
  const { BACKEND_URL, config } = useContext(AuthContext);
  const history = useHistory();
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/customer/cart`,
        config
      );
      setProducts(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCart();
  }, []);
  console.log(products)
  return (
    <div
      className={open ? "cartPreview" : "cartPreview hide"}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="cartPreviewContainer">
        <div className="cartPreviewHeader">Recently added products</div>
        <div className="cartPreviewProducts">
          <ul>
            {products.slice(0, 10).map((item) => (
              <li key={item.id} onClick={() => history.push(`/checkout`)}>
                <div className="cartProductLeft">
                  <img src={item.product.images[0]} alt="" />
                  <span>{item.product.name}</span>
                </div>
                <div className="cartProductRight">
                  <span className="price-symbol">₫</span>
                  {item.product.price}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
