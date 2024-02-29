import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    photo: {
      type: String,
      default: null,
    },
    rank: {
      type: Number,
      default: 0,
    },
    gross: {
      type: Number,
      default: 0,
    },
    Net: {
      type: Number,
      default: 0,
    },
    handicap: {
      type: Number,
      default: 0,
    },
    cash: {
      type: Number,
      default: 0,
    },
    most_played: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

let UserModel;

try {
  UserModel = mongoose.model("Smash");
} catch (e) {
  UserModel = mongoose.model("Smash", userSchema);
}

export default UserModel;
