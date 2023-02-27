const express = require("express");
const router = express.Router();
const {
  getComments,
  comment,
  reactComment,
  updateComment,
  deleteComment,
  replyComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:postId", protect, getComments);
router.post("/:postId", protect, comment);
router.put("/react/:commentId", protect, reactComment);
router.put("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);
router.post("/reply/:commentId", protect, replyComment);
module.exports = router;
