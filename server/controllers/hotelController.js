const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const getAllHotels = async (req, res, next) => {
  const {min, max, ...others} = req.query
  try {
    const allHotels = await Hotel.find({
      ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999999 }
    })
    res.status(200).json( allHotels )
  } catch (error) {
    next(error)
  }
}

const getHotelByOption = async (req, res, next) => {
  const {min, max, ...others} = req.query
  try {
    const allHotels = await Hotel.find({ 
      city: req.query.city, 
      ...others,
      // cheapestPrice: { $gt: min | 1, $lt: max || 999999 }
    })
    res.status(200).json( allHotels )
  } catch (error) {
    next(error)
  }
}

const getHotel = async (req, res, next) => {
  const hotelId = req.params.id
  try {
    const hotel = await Hotel.findById(hotelId)
    if (!hotel) {
      res.status(404).json({ success: false, message: 'Hotel not found!'})
    }
    res.status(200).json({ success: true, messgae: 'Get single hotel', hotel})
  } catch (error) {
    next(error)
  }
}

const createHotel = async (req, res, next) => {
  try {
    const { name, type, city, address, distance, photos, title, desc, rating, rooms, cheapestPrice, featured } = req.body
    const newHotel = new Hotel({ name, type, city, address, distance, photos, title, desc, rating, rooms, cheapestPrice, featured })
    await newHotel.save()
    res.status(200).json({ success: true, message: 'Create hotel', newHotel})
  } catch (error) {
    next(error)
  }
}

const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id
  try {
    const { name, type, city, address, distance, photos, title, desc, rating, rooms, cheapestPrice, featured } = req.body
    const updatedHotel ={ name, type, city, address, distance, photos, title, desc, rating, rooms, cheapestPrice, featured }
    await Hotel.findByIdAndUpdate(hotelId, updatedHotel, { new: true })
    res.status(200).json({ success: true, message: 'Update hotel', updatedHotel})
  } catch (error) {
    next(error)
  }
}

const updateHotelPhotos = async (req, res, next) => {
  const hotelId = req.params.id
  const newPhotos = req.body
  try {
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { photos: newPhotos }
    })
    res.status(200).json({ success: true, message: 'Update hotel photos',  })
  } catch (error) {
    next(error)
  }
}

const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id
  try {
    const deletedHotel = await Hotel.findOneAndDelete(hotelId)
    if (!deletedHotel) {
      res.status(404).json({ success: false, message: 'Hotel not found!'})
    }
    res.status(200).json({ success: true, message: 'Delete hotel', deletedHotel})
  } catch (error) {
    next(err)
  }
}

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const cityList = await Promise.all(cities.map((city) => {
      return Hotel.countDocuments({ city: city })
    }))
    res.status(200).json({ success: true, message: 'Count by city', cityList, cities})
  } catch (error) {
    next(error)
  }
}

const countByType = async (req, res, next) => {
  const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin']
  try {
    const countType = await Promise.all(types.map((type) => {
      return Hotel.countDocuments({ type: type })
    }))
    res.status(200).json({ success: true, message: 'Count by type', countType, types})
  } catch (error) {
    next(error)
  }
}

const getHotelRooms = async (req, res, next) => { 
  const hotelId = req.params.id
  try {
    const hotel = await Hotel.findById(hotelId)
    const hotelRooms = await Promise.all(hotel.rooms.map((room) => {
      return Room.findById(room)
    }))
    if (!hotelRooms) {
      res.status(404).json({ success: false, message: 'Room not found!'})
    }
    res.status(200).json({ success: true, message: 'Get hotel rooms', hotelRooms})
  } catch (error) {
    next(error)
  }
}

const getRandomHotels = async (req, res, next) => {
  const number = req.query.limit
  try {
    const numberOfHotel = number
    const allHotels = await Hotel.find();
    const randomArr = [];
    const randomHotels = []
    while(randomArr.length < numberOfHotel) {
      const random = Math.floor(Math.random() * allHotels.length);
      if (!randomArr.includes(random)) {
        randomArr.push(random)
        randomHotels.push(allHotels[random])
      }
    }
    res.status(200).json(randomHotels)
  } catch (error) {
    next(error)
  }
}

const getFeaturedHotel = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find().limit(4)
    res.status(200).json( allHotels )
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllHotels, getHotelByOption, getHotel, createHotel, updateHotel, updateHotelPhotos, deleteHotel, countByCity, countByType, getHotelRooms, getRandomHotels, getFeaturedHotel }