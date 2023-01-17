const express = require('express')
const Hotel = require('../models/Hotel')
const { getAllHotels, getHotel, createHotel, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms } = require('../controllers/hotel')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()

router.get('/', getAllHotels)

router.get('/find/:id', getHotel)

router.post("/", verifyAdmin, createHotel);

router.put('/:id', verifyAdmin, updateHotel)

router.delete('/:id', verifyAdmin, deleteHotel)

router.get('/countByCity', countByCity)

router.get('/countByType', countByType)

router.get('/room/:id', getHotelRooms)


module.exports = router