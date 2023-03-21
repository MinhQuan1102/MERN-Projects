import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddProductImage from "../AddProductImage/AddProductImage";
import "./addProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    desc: "",
    images: [],
  });

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <div className="addProduct">
      <div className="addProductContainer">
        <div className="productInfo">
          <h2>Product Infomation</h2>
          <table>
            <tbody>
              <tr>
                <td className="productHeading">Name</td>
                <td style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className="inputField"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Your product name"
                      maxLength="100"
                      id="name"
                      onChange={handleChange}
                    />
                    <span className="inputCharacter">{`${product.name.length}/100`}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="productHeading">Price</td>
                <td>
                  <div
                    className="inputField"
                    style={{
                      gap: "5px",
                    }}
                  >
                    <span className="currencyCharacter">$</span>
                    <input
                      type="number"
                      placeholder="Your product price"
                      id="price"
                      onChange={handleChange}
                      style={{ paddingLeft: "5px" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="productHeading">Category</td>
                <td>
                  <div className="inputField">
                    <input
                      type="text"
                      placeholder="Choose product category"
                      id="category"
                      onChange={handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="productHeading">In stock</td>
                <td>
                  <div
                    className="inputField"
                    style={{
                      gap: "5px",
                    }}
                  >
                    <input
                      type="number"
                      placeholder="Your product quantity in stock"
                      id="quantity"
                      onChange={handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  className="productHeading"
                  style={{
                    alignItems: "flex-start",
                  }}
                >
                  Description
                </td>
                <td>
                  <div
                    className="inputField"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <textarea
                      type="text"
                      placeholder="Your product description"
                      id="desc"
                      maxLength={1000}
                      onChange={handleChange}
                    />
                    <span className="textareaCharacter">{`${product.desc.length}/1000`}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="productHeading">Product Image</td>
                <td style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {product.images.slice(0, 6).map((image, i) => (
                    <AddProductImage
                      image={image}
                      product={product}
                      setProduct={setProduct}
                      index={i}
                    />
                  ))}
                  <label htmlFor="file">
                    <div className="addImage">
                      <FontAwesomeIcon
                        icon={faImage}
                        className="addImageIcon"
                      />
                      <span>{`Add image (${
                        product.images.length > 6 ? 6 : product.images.length
                      }/6)`}</span>
                    </div>
                    <input
                      type="file"
                      name=""
                      id="file"
                      multiple
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                      disabled={product.images.length >= 6}
                      onChange={(event) =>
                        setProduct((prev) => ({
                          ...prev,
                          images: [...product.images, ...event.target.files],
                        }))
                      }
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
