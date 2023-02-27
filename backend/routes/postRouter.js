const express = require("express");
const router = express.Router();
const {
  uploadPost,
  getUserPosts,
  updatePost,
  unpinAllPosts,
  deletePost,
  reactPost,
  getTimelinePosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, uploadPost);
router.get("/:userId", protect, getUserPosts);
router.put("/update/:postId", protect, updatePost);
router.put("/unpin/:userId", protect, unpinAllPosts);
router.put("/:postId", protect, reactPost);
router.delete("/:postId", protect, deletePost);
router.get("/timeline/:userId", protect, getTimelinePosts)
module.exports = router;
