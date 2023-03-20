const User = require("../model/User");
const bcrypt = require("bcrypt");
const { request } = require("express");

//@description    search user by name
//@route          GET /api/users/
//@access         Protected
const searchUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        fullName: { $regex: req.query.search, $options: "i" },
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).json(users);
};

//@description    search user by name
//@route          POST /api/users/friends/:userId
//@access         Protected
const searchUserFriend = async (req, res) => {
  const keyword = req.query.search
    ? {
        fullName: { $regex: req.query.search, $options: "i" },
      }
    : {};
  const currentUser = await User.findById(req.body.userId);
  const friendsId = currentUser.friends.map((friend) => friend._id);

  const users = await User.find({
    ...keyword,
    _id: { $in: friendsId },
  });
  res.status(200).json(users);
};

//@description    get user information by id
//@route          GET /api/users/:id
//@access         Protected
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("friends")
      .populate({
        path: "pinnedPost",
        populate: {
          path: "user sender taggedFriends react like heart haha wow sad angry sharedPost",
          select: "fullName avatar",
        },
      })
      .populate({
        path: "pinnedPost",
        populate: {
          path: "sharedPost",
          populate: { path: "user", select: "fullName avatar" },
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...other } = user._doc;
    return res.status(200).json({ user: other });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    Update user information
//@route          PUT /api/users/:id
//@access         Protected
const updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      // update password
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json({ message: "error", error: error });
        }
      }

      // update other information
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json({ message: "Updated user successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    add friend
//@route          PUT /api/users/addfriend/:id
//@access         Protected
const addFriend = async (req, res) => {
  try {
    const userToAdd = req.params.userId;
    const { userId } = req.body;
    let currentUser = await User.findById(userId);
    if (currentUser.friends.includes(userToAdd))
      return res.status(400).json({ message: "You guys are already friends!" });
    // add user to current user's friend list and following list, remove user from current user's pending users list
    currentUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { friends: userToAdd, followings: userToAdd },
        $pull: { pendingUsers: userToAdd },
      },
      { new: true }
    );
    let addedUser = await User.findByIdAndUpdate(
      userToAdd,
      {
        $push: { friends: userId, followers: userId },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Add friend successfully!", currentUser, addedUser });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    unfriend
//@route          PUT /api/users/unfriend/:id
//@access         Protected
const unfriend = async (req, res) => {
  try {
    const userToUnfriend = req.params.userId;
    const { userId } = req.body;
    let currentUser = await User.findById(userId);
    if (!currentUser.friends.includes(userToUnfriend))
      return res.status(400).json({ message: "You guys are not friends!" });
    currentUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          friends: userToUnfriend,
          followings: userToUnfriend,
          followers: userToUnfriend,
        },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userToUnfriend,
      { $pull: { friends: userId, followers: userId, followings: userId } },
      { new: true }
    );
    return res.status(200).json({ message: "Unfriend successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    follow user
//@route          PUT /api/users/followUser/:id
//@access         Protected
const followUser = async (req, res) => {
  try {
    const userToFollow = req.params.userId;
    const { userId } = req.body;
    let currentUser = await User.findById(userId);
    if (currentUser.followings.includes(userToFollow))
      return res
        .status(400)
        .json({ message: "You already followed this user!" });
    currentUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { followings: userToFollow },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userToFollow,
      { $push: { followers: userId } },
      { new: true }
    );
    return res.status(200).json({
      message: "Follow user successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    unfollow user
//@route          PUT /api/users/unfollowUser/:id
//@access         Protected
const unfollowUser = async (req, res) => {
  try {
    const user = req.params.userId;
    const { userId } = req.body;
    let currentUser = await User.findById(userId);
    // check if current user has followed this user
    if (!currentUser.followings.includes(user))
      return res.status(400).json({ message: "You did not follow this user!" });
    // remove this user from current user's followings list
    currentUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { followings: user },
      },
      { new: true }
    );
    // remove current user from this user's followers list
    await User.findByIdAndUpdate(
      user,
      { $pull: { followers: userId } },
      { new: true }
    );
    return res.status(200).json({
      message: "Unfollow user successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    send friend request
//@route          PUT /api/users/sendFriendRequest/:id
//@access         Protected
const sendFriendRequest = async (req, res) => {
  try {
    const userToAdd = req.params.userId;
    const { userId } = req.body;
    let userToFollow = await User.findById(userToAdd);
    let currentUser = await User.findById(userId);
    // check if current user has sent a friend request
    if (userToFollow.pendingUsers.includes(userId))
      return res
        .status(400)
        .json({ message: "You already sent a friend request to this user!" });
    // add currentUser to this user's pending users and followers
    userToFollow = await User.findByIdAndUpdate(
      userToAdd,
      { $push: { pendingUsers: userId, followers: userId } },
      { new: true }
    );
    // check if current user has followed this user
    if (!currentUser.followings.includes(userToAdd)) {
      currentUser = await User.findByIdAndUpdate(userId, {
        $push: { followings: userToAdd },
      });
    }

    return res
      .status(200)
      .json({ message: "Sending friend request successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    unsend friend request
//@route          PUT /api/users/unsendFriendRequest/:id
//@access         Protected
const unsendFriendRequest = async (req, res) => {
  try {
    const userToAdd = req.params.userId;
    const { userId } = req.body;
    let user = await User.findById(userToAdd);
    if (!user.pendingUsers.includes(userId))
      return res
        .status(400)
        .json({ message: "You have not sent a friend request to this user!" });
    user = await User.findByIdAndUpdate(
      userToAdd,
      { $pull: { pendingUsers: userId } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Unsending friend request successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    delete friend request
//@route          PUT /api/users/deleteFriendRequest/:id
//@access         Protected
const deleteFriendRequest = async (req, res) => {
  try {
    const userToDelete = req.params.userId;
    const { userId } = req.body;
    let user = await User.findById(userId);
    if (!user.pendingUsers.includes(userToDelete))
      return res
        .status(400)
        .json({ message: "This user did not send you a friend request!" });
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { pendingUsers: userToDelete } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Deleting friend request successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

//@description    post new image
//@route          PUT /api/users/postImage/:id
//@access         Protected
const postNewImage = async (req, res) => {
  try {
    const { userId, newPhoto } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { photos: newPhoto } },
      { new: true }
    );
    return res.status(200).json({ message: "Post new image successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error });
  }
};

module.exports = {
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
  postNewImage,
};
