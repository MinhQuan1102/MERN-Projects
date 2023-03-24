import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AddProductImage from "../AddProductImage/AddProductImage";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "./addProduct.css";

const AddProduct = () => {
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    quantity: 0,
    desc: "",
    images: [],
  });
  const toast = useToast();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    let images = [];
    if (product.images.length > 0) {
      const promises = product.images.map(async (pic) => {
        const data = new FormData();
        data.append(`file`, pic);
        data.append("upload_preset", "BazaarBay");
        data.append("cloud_name", "dvvyj75uf");
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dvvyj75uf/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          const json = await response.json();
          console.log(json.url.toString());
          return json.url.toString();
        } catch (error) {
          toast({
            title: "Error uploading images!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
      });
      images = await Promise.all(promises);
      try {
        await axios.post(
          `https://e-commerce-production-43d5.up.railway.app/api/store/products`,
          {
            ...product,
            images: images,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "Create post successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        window.location.reload();
      } catch (error) {}
    } else {
      toast({
        title: "Please choose at least 1 images",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
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
                      value={product.name}
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
        <div className="productButtons">
          <button onClick={(e) => handleAddProduct(e)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
