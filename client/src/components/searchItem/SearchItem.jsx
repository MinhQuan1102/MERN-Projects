import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({hotel}) => {
  const navigate = useNavigate()
  const hotelId = hotel._id
  const handleClick = () => {
    navigate(`/hotels/${hotelId}`)
  }
  const formatPrice = (price) => {
    price = price.toFixed(3)
    price = (price + "").replace('.', '');
    for (let i = price.length - 3; i > 0; i -= 3) {
      price = price.slice(0, i) + '.' + price.slice(i)
    }
    return price
  }
  return (
    <div className="searchItem">
      <img
        src={hotel.photos && hotel.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {hotel.title}
        </span>
        <span className="siFeatures">
          {hotel.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{hotel.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{formatPrice(hotel.cheapestPrice)}đ</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleClick}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
