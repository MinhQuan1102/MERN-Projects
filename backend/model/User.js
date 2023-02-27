const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    pendingUsers: {
      type: Array,
      default: [],
      required: false,
    },
    desc: {
      type: String,
      default: "",
      max: 250,
    },
    livesIn: {
      type: String,
      required: false,
      default: "",
    },
    from: {
      type: String,
      required: false,
      default: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    gender: {
      type: Number,
      enum: [1, 2],
      default: 1,
    },
    workAt: {
      type: String,
      required: false,
      default: "",
    },
    wentTo: {
      type: Array,
      required: false,
      default: [],
    },
    website: {
      type: String,
      required: false,
      default: "",
    },
    hobbies: {
      type: Array,
      required: false,
      default: [],
    },
    socialLinks: {
      type: String,
      required: false,
      default: "",
    },
    photos: {
      type: Array,
      required: false,
      default: [],
    },
    pinnedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: undefined,
    }
  },
  { timeStamps: true }
);

// UserSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("User", UserSchema);
