import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '../context/SearchContext'
import useFetch from '../hooks/useFetch'

const Reserve = ({setOpen, hotelId}) => {
  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/hotels/room/${hotelId}`
  );
  const hotelRooms = data.rooms

  const [selectedRooms, setSelectedRooms] = useState([])
  const { state } = useSearchContext()
  const { dates } = state
  const navigate = useNavigate()

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime());
    let list = []
    while (date <= end) {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return list
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
    )
  }

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const response = axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`, { dates: allDates })
          return response.data
        })
      )
      setOpen(false)
      navigate('/')
    } catch (error) {
      
    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms: </span>
        {data.success &&
          hotelRooms.map((item) => (
            <>
              <div className="rItem" key={item._id}>
                <div className="rInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">${item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <>
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          ))}
        <button onClick={handleClick} className="rButton">
          Reserve now!
        </button>
      </div>
    </div>
  );
}

export default Reserve