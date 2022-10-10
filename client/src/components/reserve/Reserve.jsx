import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import { useContext, useState } from "react";
import axios from "axios";
import useFetch from '../../hooks/useFetch';

const Reserve = ({id, setOpen}) => {
  const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/room/${id}`)
  let rooms
  if (data) {
    rooms = data.hotelRooms
    console.log(rooms)
    console.log(rooms[0].roomNumbers)
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
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        { data && rooms.map((room) => (
          <div className="rItem" key={room._id}>
            <div className="rItemInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.desc}</div>
              <div className="rMax">
                Max people: <b>{room.maxPeople}</b>
              </div>
              <div className="rPrice">{formatPrice(room.price)}đ</div>
            </div>
            <div className="rSelectRooms"> 
              {room.roomNumbers.map((item) => (
                <div className="room">
                  <label>{item.numbers}</label>
                  <input
                    type="checkbox"
                    value='101'
                    disabled
                  />
                </div>
              ))}
            </div> 
          </div>
        ))}
        <button className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve