import { useState } from "react";

const ProductImage = ({ image, setCurrentImage, index }) => {
  const [selectedImage, setSelectedImage] = useState(false);
  const imageSize = !selectedImage ? 66 : 61;
  return (
    <div
      className={
        selectedImage ? "productOtherImage selectedBorder" : "productOtherImage"
      }
    >
      <img
        src={image}
        alt=""
        key={index}
        style={{
          maxWidth: `${imageSize}px`,
          maxHeight: `${imageSize}px`,
          minWidth: `${imageSize}px`,
          minHeight: `${imageSize}px`,
        }}
        onMouseOver={() => {
          setCurrentImage(image);
          setSelectedImage(true);
        }}
        onMouseLeave={() => {
          setSelectedImage(false);
        }}
      />
    </div>
  );
};

export default ProductImage;
