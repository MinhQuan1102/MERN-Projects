const express = require('express')
const router = express.Router()
const { getAllHotels, getHotelByOption, getHotel, createHotel, updateHotel, updateHotelPhotos, deleteHotel, countByCity, countByType, getHotelRooms, getRandomHotels, getFeaturedHotel } = require('../controllers/hotelController')
const { verifyUser, verifyAdmin } = require('../util/verify')

// count by city
router.get('/countByCity', countByCity)

// count by type 
router.get('/countByType', countByType)

// get random Hotel
router.get('/random', getRandomHotels)

// get hotel by option
router.get('/option', getHotelByOption)

// get featured hotel
router.get('/featured', getFeaturedHotel)

// update hotel photos
router.post('/updatePhotos/:id', verifyAdmin, updateHotelPhotos)

// get all hotels
router.get('/', getAllHotels)

// get single hotel
router.get('/:id', getHotel)

// create hotel
router.post('/', verifyAdmin, createHotel)

// update hotel
router.put('/:id', verifyAdmin, updateHotel)

// delete hotel
router.delete('/:id', verifyAdmin, deleteHotel)

// get hotel rooms
router.get('/room/:id', getHotelRooms)



module.exports = router