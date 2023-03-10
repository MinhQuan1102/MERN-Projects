import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./checkout.css";

const Checkout = () => {
  return (
    <div className="checkout">
      <BreadCrumb title="Cart / Checkout" />
      <div className="checkoutContainer">
        <div className="deliveryLocation">
          <div className="deliveryTitle">
            <FontAwesomeIcon icon={faLocationDot} className="locationIcon" />
            <h2>Delivery Location</h2>
          </div>
          <div className="customerLocationInfo">
            <span className="customerName">Do Minh Quan</span>
            <span className="customerPhone">0825134034</span>
            <span className="customerLocation">
              445 Au Co, Nhat Tan, Tay Ho, Ha Noi
            </span>
            <div className="defaultText">Default</div>
            <span className="changeLocationText">Change</span>
          </div>
        </div>

        <div className="checkoutProducts">
          <div className="shopInfo">
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/273210834_3086464761611742_3914305251108406206_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpZUB-TOXNUAX9fnPSj&_nc_ht=scontent.fhan14-3.fna&oh=00_AfA92m10XiplbJb0QeM-d8Rw0HB1neXeo_mJdUsJfh3JqQ&oe=640D4AC3"
              alt=""
              className="shopAvatar"
            />
            <span className="shopName">MQShop</span>
          </div>
          <table>
            <thead>
              <tr style={{ display: "flex", paddingBottom: "15px" }}>
                <th
                  style={{
                    flex: "6",
                    color: "#222",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Product
                </th>
                <th style={{ flex: "1.5" }}>Price</th>
                <th style={{ flex: "1.5", textAlign: "center" }}>Quantity</th>
                <th style={{ flex: "2.5", textAlign: "right" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ display: "flex" }}>
                <td
                  style={{
                    flex: "6",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <img
                    src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                    alt=""
                  />
                  <span>Suc sieu vip</span>
                </td>
                <td style={{ flex: "1.5" }}>2M</td>
                <td style={{ flex: "1.5", justifyContent: "center" }}>2</td>
                <td style={{ flex: "2.5", justifyContent: "flex-end" }}>4M</td>
              </tr>
              <tr style={{ display: "flex" }}>
                <td
                  style={{
                    flex: "6",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <img
                    src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                    alt=""
                  />
                  <span>Suc sieu vip</span>
                </td>
                <td style={{ flex: "1.5" }}>20k</td>
                <td style={{ flex: "1.5", justifyContent: "center" }}>2</td>
                <td style={{ flex: "2.5", justifyContent: "flex-end" }}>40k</td>
              </tr>
            </tbody>
          </table>
          <div className="deliveryOption">
            <div className="deliveryPartner">
              <span className="deliveryHeading">Delivery Partner: </span>
              <span className="deliveryPartnerName">Giao hang nhanh vcl</span>
              <span className="deliveryChangeText">Change</span>
            </div>
            <div className="deliveryPrice">50k</div>
          </div>
          <div className="totalProductPrice">
            <span>{`Total price (2 products): `}</span>
            <span>90k</span>
          </div>
        </div>

        <div className="checkoutProducts">
          <div className="shopInfo">
            <img
              src="https://cf.shopee.vn/file/4ed294e6a967c6977f5471881fb9ef65_tn"
              alt=""
              className="shopAvatar"
            />
            <span className="shopName">Lucky Shoes VN</span>
          </div>
          <table>
            <thead>
              <tr style={{ display: "flex", paddingBottom: "15px" }}>
                <th
                  style={{
                    flex: "6",
                    color: "#222",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Product
                </th>
                <th style={{ flex: "1.5" }}>Price</th>
                <th style={{ flex: "1.5", textAlign: "center" }}>Quantity</th>
                <th style={{ flex: "2.5", textAlign: "right" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ display: "flex" }}>
                <td
                  style={{
                    flex: "6",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <img
                    src="https://cf.shopee.vn/file/sg-11134201-22110-5co0i2evafkve8"
                    alt=""
                  />
                  <span>Suc sieu vip</span>
                </td>
                <td style={{ flex: "1.5" }}>20k</td>
                <td style={{ flex: "1.5", justifyContent: "center" }}>2</td>
                <td style={{ flex: "2.5", justifyContent: "flex-end" }}>40k</td>
              </tr>
              <tr style={{ display: "flex" }}>
                <td
                  style={{
                    flex: "6",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <img
                    src="https://cf.shopee.vn/file/8a68151c06e45e7c70f7371b073979a6"
                    alt=""
                  />
                  <span>Suc ca map</span>
                </td>
                <td style={{ flex: "1.5" }}>50k</td>
                <td style={{ flex: "1.5", justifyContent: "center" }}>3</td>
                <td style={{ flex: "2.5", justifyContent: "flex-end" }}>
                  150k
                </td>
              </tr>
            </tbody>
          </table>
          <div className="deliveryOption">
            <div className="deliveryPartner">
              <span className="deliveryHeading">Delivery Partner: </span>
              <span className="deliveryPartnerName">Giao hang nhanh vcl</span>
              <span className="deliveryChangeText">Change</span>
            </div>
            <div className="deliveryPrice">50k</div>
          </div>
          <div className="totalProductPrice">
            <span>{`Total price (2 products): `}</span>
            <span>240k</span>
          </div>
        </div>

        <div className="cartTotal">
          <div className="cartTotalContainer">
            <div className="paymentMethod">
              <span>Payment method</span>
            </div>
            <div className="cartTotalPrice">
              <div className="cartTotalPriceContainer">
                <div className="productPrice">
                  <h2>Product price</h2>
                  <span>380k</span>
                </div>
                <div className="shipmentFee">
                  <h2>Shipment fee</h2>
                  <span>100k</span>
                </div>
                <div className="totalPrice">
                  <h2>Total price:</h2>
                  <span style={{ fontSize: "25px" }}>480k</span>
                </div>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
