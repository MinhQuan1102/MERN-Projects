const express = require("express");
const router = express.Router();
const {
  uploadPost,
  sharePost,
  getUserPosts,
  getPost,
  updatePost,
  unpinAllPosts,
  deletePost,
  reactPost,
  getTimelinePosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, uploadPost);
router.post("/share", protect, sharePost);
router.get("/:userId", protect, getUserPosts);
router.get("/singlePost/:postId", protect, getPost);
router.put("/update/:postId", protect, updatePost);
router.put("/unpin/:userId", protect, unpinAllPosts);
router.put("/:postId", protect, reactPost);
router.delete("/:postId", protect, deletePost);
router.get("/timeline/:userId", protect, getTimelinePosts);
module.exports = router;
