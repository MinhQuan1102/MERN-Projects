const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");

//@description    upload new post
//@route          POST /api/posts
//@access         Protected
const uploadPost = async (req, res) => {
  try {
    const {
      user,
      content,
      images,
      sender,
      status,
      taggedFriends,
      isUpdatingProfilePicture,
      isUpdatingCoverPicture,
    } = req.body;
    if (!user) {
      return res.status(400).json("Please provide enough fields!");
    }
    const post = new Post({
      user,
      content,
      images,
      sender,
      status,
      taggedFriends,
      isUpdatingProfilePicture,
      isUpdatingCoverPicture,
    });
    const newPost = await post.save();
    return res
      .status(201)
      .json({ message: "Upload post successfully!", post: newPost });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    get all posts of a user
//@route          GET /api/posts/:userId
//@access         Protected
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ user: userId })
      .populate({ path: "user", select: "fullName avatar"})
      .populate({ path: "sender", select: "fullName avatar"})
      .populate({ path: "taggedFriends", select: "fullName avatar"})
    res.status(200).json({ message: "Get posts successfully", posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    update a post
//@route          PUT /api/posts/update/:postId
//@access         Protected
const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $set: req.body,
    });
    return res.status(200).json({ message: "Updated post successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    unpin all posts of a user
//@route          PUT /api/posts/unpin/:userId
//@access         Protected
const unpinAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ user: req.params.userId });
    await Post.updateMany(
      { _id: { $in: allPosts.map((post) => post._id) } },
      { isPinned: false }
    );
    return res.status(200).json({ message: "Unpin all posts successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    delete post by id
//@route          DELETE /api/posts/:postId
//@access         Protected
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const posts = await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Delete post successfully", posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    react a post
//@route          PUT /api/posts/:postId
//@access         Protected
const reactPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reactType = req.body.reactType;
    const userId = req.body.userId;
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
    const posts = await Post.findByIdAndUpdate(postId, update, { new: true });
    res.status(200).json({ message: "React post successfully", posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

//@description    get timeline post of a user
//@route          GET /api/posts/timeline/:userId
//@access         Protected
const getTimelinePosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ user: userId })
      .populate({ path: "user", select: "fullName avatar"})
      .populate({ path: "sender", select: "fullName avatar"})
      .populate({ path: "taggedFriends", select: "fullName avatar"})
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ user: friendId })
          .populate({ path: "user", select: "fullName avatar"})
          .populate({ path: "sender", select: "fullName avatar"})
          .populate({ path: "taggedFriends", select: "fullName avatar"});
      })
    );
    res.status(200).json({
      message: "Get posts successfully",
      posts: userPosts
        .concat(...friendPosts)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};





module.exports = {
  uploadPost,
  getUserPosts,
  updatePost,
  unpinAllPosts,
  deletePost,
  reactPost,
  getTimelinePosts,

};
