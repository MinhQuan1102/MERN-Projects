const express = require('express')
const router = express.Router()
const { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom, updateRoomAvailability } = require('../controllers/roomControllers')
const { verifyUser, verifyAdmin } = require('../util/verify')

// get all rooms
router.get('/', getAllRooms)

// get single room
router.get('/:id', getRoom)

// create room
router.post('/', verifyAdmin, createRoom)

// update room
router.put('/:id', verifyAdmin, updateRoom)

// delete room
router.delete('/:id', verifyAdmin, deleteRoom)

// update room availability
router.post('/', verifyAdmin, updateRoomAvailability)
module.exports = router