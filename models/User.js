const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, default: "" },
    lastname: { type: String, required: true, default: "" },
    address: { type: String, required: true, default: "" },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, default: "" },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    refreshToken: { type: String },
    img: { type: String },
    transactions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
