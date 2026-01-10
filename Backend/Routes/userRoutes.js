import { Router } from "express";
import {
  login,
  signup,
  userList,
  welcome,
} from "../Controller/authController.js";
import { varifyToken } from "../Middlewere/varifyToken.js";

const user_Router = Router();
user_Router.post("/welcome", welcome);
user_Router.post("/signup", signup);
user_Router.post("/login", login);
user_Router.post("/alluser", varifyToken, userList);
export default user_Router;
