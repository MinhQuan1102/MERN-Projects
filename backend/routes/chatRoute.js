const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Chat = require("../model/Chat");
const User = require("../model/User");

// access chat
router.route("/").post(protect, async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Please provide a userId" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "lastestMessage.sender",
    select: "name picture email",
  });

  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "user",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// fetch chat
router.route("/").get(protect, async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
        });
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// create group chat
router.route("/group").post(protect, async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ message: "Please provide users and name" });
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/rename").put(protect, async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  res.status(200).json(updatedChat);
});

router.route("/groupremove").put(protect, async (req, res) => {
  const { chatId, userId } = req.body;
  const existed = await Chat.find({ users: userId });
  if (existed.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    return res.status(404).json({ message: "Chat not found" });
  }
  res.status(200).json(removed);
});

router.route("/groupadd").put(protect, async (req, res) => {
  const { chatId, userId } = req.body;
  const existed = await Chat.find({ users: userId })
  if (existed.length > 0) {
    return res.status(400).json({ message: "User already in chat" })
  }
  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  ).populate("users", "-password").populate("groupAdmin", "-password");
  if (!added) {
    return res.status(404).json({ message: "Chat not found" });
  }
  res.status(200).json(added);
});

module.exports = router;
