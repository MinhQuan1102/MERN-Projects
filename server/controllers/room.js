const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const createError = require('../utils/error')

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res
      .status(200)
      .json(rooms);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({ success: true, message: "Get single room", room });
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  const newRoom = new Room(req.body)

  try {
    const savedRoom = await newRoom.save()
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
    } catch (error) {
      next(error)
    }
    res.status(200).json({ success: true, message: 'Room created!', newRoom: savedRoom})
  } catch (error) {
    next(error)
  }
}

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { $set: req.body },
      { new: true}
    )
  res
    .status(200)
    .json({ success: true, message: "Room updated!", updatedRoom });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });      
    } catch (error) {
      next(error)
    }
    res
      .status(200)
      .json({ success: true, message: "Room deleted", deletedRoom });
  } catch (error) {
    next(error);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id},
      { $push: {
        "roomNumbers.$.unavailableDates": req.body.dates
      }}
      )
      res.status(200).json({ success: true, message: 'Update room availability successfully!'})
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom, updateRoomAvailability}