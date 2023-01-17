const express = require("express");

const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability
} = require("../controllers/room");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getAllRooms);

router.get("/:id", getRoom);

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/:roomId", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability)

router.delete("/:hotelid/:id", verifyAdmin, deleteRoom);

module.exports = router;
