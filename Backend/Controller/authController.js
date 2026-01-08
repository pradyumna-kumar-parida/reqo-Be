import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
export const welcome = async (req, res) => {
  await res.status(201).json({
    message:
      "Welcome to our Reqo. kepp explore with your newly attched friends...",
  });
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, number, password } = req.body;

    if (!firstName || !lastName || !email || !number || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const existuser = await userModel.findOne({ email });
    if (existuser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      number,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "Signup successfully",
      user: {
        userid: user._id,
        fname: user.firstName,
        lname: user.lastName,
        email: user.email,
        phoneNumber: user.number,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user_email, user_pw } = req.body;
    console.log(req.body);

    if (!user_email || !user_pw) {
      return res.status(409).json({
        message: "All fields are required",
      });
    }
    const loginUser = await userModel
      .findOne({ email: user_email })

    console.log("usersssS", loginUser);

    if (!loginUser) {
      return res
        .status(404)
        .json({ message: "Invalid user or user not found" });
    }
    console.log("hashed password from DB:", loginUser.password);
    const matchPw = await bcrypt.compare(user_pw, loginUser.password);
    if (!matchPw) {
      return res.status(404).json({
        message: "Incorrect password",
      });
    }
    console.log("passssss", matchPw);

    const token = jwt.sign({ userId: loginUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log("token", token);

    return res.status(201).json({
      message: "Login sucessfully !",
      token: token,
      user: loginUser,
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
