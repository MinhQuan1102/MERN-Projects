import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./addProductImage.css";

const AddProductImage = ({ image, product, setProduct, index }) => {
  const [openDeleteImg, setOpenDeleteImg] = useState(false);

  return (
    <div
      className="addProductImage"
      onMouseOver={() => setOpenDeleteImg(true)}
      onMouseLeave={() => setOpenDeleteImg(false)}
      key={index}
    >
      <img src={image} alt="" className="productImg" />
      {openDeleteImg && (
        <div className="deleteImgContainer" onClick={() => setProduct((prev) => ({...prev, images: product.images.filter(img => img !== image)}))}>
          <FontAwesomeIcon icon={faTrash} className="deleteIcon" />
        </div>
      )}
    </div>
  );
};

export default AddProductImage;
