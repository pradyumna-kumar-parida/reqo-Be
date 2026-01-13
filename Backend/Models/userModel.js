import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
    trim: true,
  },
  lastName: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  number: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false,
  },
});
export const userModel = mongoose.model("User", userSchema);
  