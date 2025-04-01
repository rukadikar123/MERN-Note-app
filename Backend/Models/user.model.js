import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// user Schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h", // Explicitly set token expiry to 4 hours
    }
  );
};

// Create a "User" model using the userSchema to interact with the users collection in MongoDB
export const User = mongoose.model("User", userSchema);
