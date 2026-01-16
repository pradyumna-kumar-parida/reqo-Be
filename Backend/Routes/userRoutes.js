import { Router } from "express";
import {
  login,
  signup,
  userList,
  welcome,
} from "../Controller/authController.js";
import { varifyToken } from "../Middlewere/varifyToken.js";
import {
  acceptRequest,
  cancelRequest,
  checkRequest,
  getFriends,
  sendRequest,
} from "../Controller/requestController.js";

const user_Router = Router();
user_Router.post("/welcome", welcome);
user_Router.post("/signup", signup);
user_Router.post("/login", login);
user_Router.post("/alluser", varifyToken, userList);
user_Router.post("/sendRequest", varifyToken, sendRequest);
user_Router.post("/checkRequest", varifyToken, checkRequest);
user_Router.post("/acceptRequest/:requestId", varifyToken, acceptRequest);
user_Router.post("/cancelRequest/:requestId", varifyToken, cancelRequest);
user_Router.post("/friendList", varifyToken, getFriends);
export default user_Router;
