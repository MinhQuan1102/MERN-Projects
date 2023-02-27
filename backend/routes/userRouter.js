const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  searchUser,
  searchUserFriend,
  getUserById,
  updateUser,
  addFriend,
  unfriend,
  followUser,
  unfollowUser,
  sendFriendRequest,
  unsendFriendRequest,
  deleteFriendRequest,
  postNewImage
} = require("../controllers/userController");

router.get("/", protect, searchUser)
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.put("/addfriend/:userId", protect, addFriend);
router.put("/unfriend/:userId", protect, unfriend);
router.put("/follow/:userId", protect, followUser);
router.put("/unfollow/:userId", protect, unfollowUser);
router.put("/sendFriendRequest/:userId", protect, sendFriendRequest);
router.put("/unsendFriendRequest/:userId", protect, unsendFriendRequest);
router.put("/deleteFriendRequest/:userId", protect, deleteFriendRequest);
router.put("/postImage/:userId", protect, postNewImage);
router.post("/friends", protect, searchUserFriend);


module.exports = router;
