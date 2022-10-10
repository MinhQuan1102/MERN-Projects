const Room = require('../models/Room')
const Hotel = require('../models/Hotel')

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}

const getRoom = async (req, res, next) => {
  const roomId = req.params.id
  try {
    const room = await Room.findById(roomId)
    if (!room) {
      res.status(404).json({success: false, message: 'Room not found!'})
    }
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

const createRoom = async (req, res, next) => {
  try {
    const { title, price, maxPeople, desc, roomNumbers } = req.body
    const newRoom = new Room({ title, price, maxPeople, desc, roomNumbers }) 
    await newRoom.save()
    res.status(201).json(newRoom)
  } catch (error) {
    next(error)
  }
}

const updateRoom = async (req, res, next) => {
  const roomId = req.params.id
  try {
    const { title, price, maxPeople, desc, roomNumbers } = req.body
    const updatedRoom = { title, price, maxPeople, desc, roomNumbers }
    await Room.findByIdAndUpdate(roomId, updatedRoom, {new: true})
    res.status(200).json({ success: true, message: 'Room updated', updatedRoom})
  } catch (error) {
    next(error)
  }
}

const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id
  try {
    const room = await Room.findByIdAndDelete(roomId)
    if (!room) {
      res.status(404).json({success: false, message: 'Room not found!'})
    }
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id},
      { $push: {
        'roomNumbers.$.unavailableDates': req.body.dates
      }}
    )
    res.status(200).json({ success: true, message: 'Update room availability successfully'})
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom, updateRoomAvailability }