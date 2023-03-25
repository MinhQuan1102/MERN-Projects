import { useEffect, useRef } from "react";
import "./cartPreview.css";

const CartPreview = ({ open, setOpen }) => {

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
            <li>
              <div className="cartProductLeft">
                <img
                  src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                  alt=""
                />
                <span>Suc sieu vip</span>
              </div>
              <div className="cartProductRight">20k</div>
            </li>
            <li>
              <div className="cartProductLeft">
                <img
                  src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                  alt=""
                />
                <span>Suc sieu vip</span>
              </div>
              <div className="cartProductRight">20k</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
