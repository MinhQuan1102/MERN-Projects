import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSearchContext } from "../../context/searchContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false)
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname
  const hotelId = path.split('/')[2]
  const { dayBookHotel } = useSearchContext()
  const { data, loading, error} = useFetch(`http://localhost:5000/api/hotels/${hotelId}`)
  let hotel, hotelPrice, totalPrice
  if (data) {
    hotel = data.hotel
    hotelPrice = data.hotel.cheapestPrice
    totalPrice = (dayBookHotel * hotel.cheapestPrice).toFixed(3)
    totalPrice = (totalPrice + "").replace('.', '');
    for (let i = totalPrice.length - 3; i > 0; i -= 3) {
      totalPrice = totalPrice.slice(0, i) + '.' + totalPrice.slice(i)
    }
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          { loading ? 'loading' : (
            <>
              {data && <>
                <button className="bookNow">Reserve or Book Now!</button>
                <h1 className="hotelTitle">{hotel.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{hotel.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – {hotel.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over {hotel.cheapestPrice}đ at this property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {hotel.photos.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel.title}</h1>
                <p className="hotelDesc">
                  {hotel.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {dayBookHotel !== 0 ? `${dayBookHotel}-night` : ''} stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {hotel.rating}!
                </span>
                {dayBookHotel !== 0 && (
                  <h2>
                    <b>{totalPrice}đ</b> ({dayBookHotel} nights)
                  </h2>
                )}
                <button onClick={() => setOpenModal(true)}>Reserve or Book Now!</button>
              </div>
            </div>
          </>}
          </>
          )}
          
        </div>
        <MailList />
        <Footer />
      </div>
      { openModal && <Reserve id={hotelId} setOpen={setOpenModal}/>}
    </div>
  );
};

export default Hotel;
