import { useToast } from "@chakra-ui/react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AddProductImage from "../AddProductImage/AddProductImage";
import "./updateProduct.css";
import { handleAddProduct } from "./updateProductLogic";

const AddProduct = () => {
  const { BACKEND_URL, config } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    images: [],
  });
  const toast = useToast();
  const history = useHistory();
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  console.log(productId)

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/product/${productId}`);
      const product = data.data;
      console.log(data)
      setProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        description: product.description,
        images: product.images
      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  console.log(product)

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="updateProduct">
      <div className="updateProductContainer">
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
                      value={product.name}
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
                      value={product.price}
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
                      value={product.category}
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
                      value={product.quantity}
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
                      id="description"
                      maxLength={1000}
                      onChange={handleChange}
                      value={product.description}
                    />
                    <span className="textareaCharacter">{`${product.description.length}/1000`}</span>
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
                      accept="image/png, image/jpeg, image/webp"
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
              <tr style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                <td
                  className="productHeading"
                  style={{
                    alignItems: "flex-start",
                  }}
                ></td>
                <td style={{ justifySelf: "flex-start" }}>
                  <button
                    className="addBtn"
                    onClick={() =>
                      handleAddProduct(
                        product,
                        BACKEND_URL,
                        config,
                        toast,
                        history
                      )
                    }
                  >
                    Update Product
                  </button>
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
