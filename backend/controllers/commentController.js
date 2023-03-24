const Comment = require("../model/Comment");
const Post = require("../model/Post");

//@description    get all comments of a post
//@route          GET /api/comments/:postId
//@access         Protected
const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate({
        path: "user like haha wow heart sad angry",
        select: "fullName avatar",
      })
      .populate({
        path: "replies",
        populate: {
          path: "user like haha wow heart sad angry",
          select: "fullName avatar friends livesIn from",
        },
      })
      .populate({
        path: "user",
        select: "fullName avatar friends livesIn from",
        populate: {
          path: "friends",
          select: "fullName avatar friends livesIn from",
        },
      })
    res
      .status(200)
      .json({ message: "Get all comments successfully", comments });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    get all comments of a post
//@route          GET /api/comments/:postId
//@access         Protected
const getReplyComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate({
        path: "user",
        select: "fullName avatar",
      })
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "fullName avatar",
        },
      })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Get all comments successfully", comments });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    comment on a post
//@route          POST /api/comments/:postId
//@access         Protected
const comment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, content, images } = req.body;
    const comment = new Comment({
      user: userId,
      content,
      images,
      post: postId,
    });
    await comment.save();
    console.log(comment);
    res.status(200).json({ message: "Commented", comment });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    react a post
//@route          PUT /api/comments/react/:commentId
//@access         Protected
const reactComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { reactType, userId } = req.body;
    let update = {};
    switch (reactType) {
      case "like":
        update = {
          $push: { like: userId },
          $pull: {
            haha: userId,
            wow: userId,
            heart: userId,
            sad: userId,
            angry: userId,
          },
        };
        break;
      case "haha":
        update = {
          $push: { haha: userId },
          $pull: {
            like: userId,
            wow: userId,
            heart: userId,
            sad: userId,
            angry: userId,
          },
        };
        break;
      case "heart":
        update = {
          $push: { heart: userId },
          $pull: {
            like: userId,
            wow: userId,
            haha: userId,
            sad: userId,
            angry: userId,
          },
        };
        break;
      case "wow":
        update = {
          $push: { wow: userId },
          $pull: {
            like: userId,
            haha: userId,
            heart: userId,
            sad: userId,
            angry: userId,
          },
        };
        break;
      case "sad":
        update = {
          $push: { sad: userId },
          $pull: {
            like: userId,
            wow: userId,
            heart: userId,
            haha: userId,
            angry: userId,
          },
        };
        break;
      case "angry":
        update = {
          $push: { angry: userId },
          $pull: {
            like: userId,
            wow: userId,
            heart: userId,
            sad: userId,
            haha: userId,
          },
        };
        break;
      case "": {
        update = {
          $pull: {
            like: userId,
            wow: userId,
            heart: userId,
            sad: userId,
            haha: userId,
            angry: userId,
          },
        };
      }
    }
    const comment = await Comment.findByIdAndUpdate(commentId, update, {
      new: true,
    });
    res.status(200).json({ message: "React post successfully", comment });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    update a comment
//@route          PUT /api/comments/:commentId
//@access         Protected
const updateComment = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      $set: req.body,
    });
    return res.status(200).json({ message: "Updated comment successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    delete post by id
//@route          DELETE /api/comments/:commentId
//@access         Protected
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Delete comment successfully", comment });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    reply comment
//@route          POST /api/comments/reply/:commentId
//@access         Protected
const replyComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { userId, content, images } = req.body;
    const savedComment = new Comment({
      user: userId,
      content,
      images,
    });
    await savedComment.save();
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { replies: savedComment._id },
      },
      { new: true }
    );
    res.status(200).json({ message: "Reply comment successfully", comment });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getComments,
  comment,
  reactComment,
  updateComment,
  deleteComment,
  replyComment,
};
