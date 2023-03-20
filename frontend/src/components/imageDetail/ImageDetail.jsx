import React from 'react'
import "./imageDetail.css"

const ImageDetail = ({ post, open, setOpen }) => {
  console.log(post)
  return (
    <div className={open ? "imageDetail" : "imageDetail hide"}>
      <div className="imageDetailContainer">
        <div className="imageDetailLeft">
          <div className="imageContainer">
            <img src={post.images[0]} alt="" />
          </div>
        </div>
        <div className="imageDetailRight">

        </div>
      </div>
    </div>
  )
}

export default ImageDetail