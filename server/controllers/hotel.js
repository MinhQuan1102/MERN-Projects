const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query
  try {
    const hotels = await Hotel.find({...others, cheapestPrice: { $gte: min || 1, $lte: max || 999 }})
    .limit(req.query.limit);
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json({ hotel })
  } catch (error) {
    next(error)
  }
}

const createHotel = async (req, res, next) => {
  const { name, type, city, address, distance, photos, desc, rating, rooms, cheapestPrice, featured } = req.body
  try {
    const newHotel = new Hotel({
      name,
      type,
      city,
      address,
      distance,
      photos,
      desc,
      rating,
      rooms,
      cheapestPrice,
      featured,
    })
    await newHotel.save()
    res.status(200).json({ newHotel})
  } catch (error) {
    next(error)
  }
}

const updateHotel = async (req, res, next) => {
  const { name, type, city, address, distance, photos, desc, rating, rooms, cheapestPrice, featured } = req.body
  try {
    let updatedHotel = {
      name,
      type,
      city,
      address,
      distance,
      photos,
      desc,
      rating,
      rooms,
      cheapestPrice,
      featured,
    }
    updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, updatedHotel, { new: true})
    res.status(200).json({ success: true, message: "Hotel updated!", updatedHotel });
  } catch (error) {
    next(error);
  }
}

const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "Hotel deleted", deletedHotel})
  } catch (error) {
    next(error)
  }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map((city) => {
      return Hotel.countDocuments({city: city})
    }))
    res.status(200).json({success: true, message: 'Count by city', list})
  } catch (error) {
    next(error)
  }
}

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({type: 'hotel'})
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json({success: true, message: 'Count By Type', count: [
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]
  })
  } catch (error) {
    next(error)
  }
}

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const roomList = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json({ success: true, message: 'Get hotel rooms', rooms: roomList})
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllHotels, getHotel, createHotel, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms }