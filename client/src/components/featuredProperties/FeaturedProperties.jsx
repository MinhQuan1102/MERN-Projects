import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error, reFetch } = useFetch('http://localhost:5000/api/hotels/random?limit=4')
  let price
 
  const formatPrice = (price) => {
    price = price.toFixed(3)
    price = (price + "").replace('.', '');
    for (let i = price.length - 3; i > 0; i -= 3) {
      price = price.slice(0, i) + '.' + price.slice(i)
    }
    return price
  }

  const navigate = useNavigate()
  const handleClick = (e) => {
    navigate(`/hotels/${e.target.id}`)
  }

  const handleImage = (images) => {
    return Math.floor(Math.random() * images.length )
  }

  // const setFeaturedList = setInterval(() => {
  //   reFetch()
  // }, 5000)

 

  // useEffect(() => {
  //   return () => {
  //     clearInterval(setFeaturedList)
  //   }
  // }, [data])
  return (
    <div className="fp">
      { loading ? ('loading') : (
        <>
          { data && data.map((item, index) => (
            <div className="fpItem" key={index}>
            <img
              src={item.photos[handleImage(item.photos)]}
              alt=""
              className="fpImg"
              id={item._id}
              onClick={handleClick}
            />
            <span className="fpName" onClick={handleClick}>{item.name}</span>
            <span className="fpCity" >{item.city}</span>
            <span className="fpPrice">Starting from {formatPrice(item.cheapestPrice)}đ</span>
            <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
