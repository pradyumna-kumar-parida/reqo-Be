import { Router } from "express";
import { login, signup, welcome } from "../Controller/authController.js";

const user_Router = Router();
user_Router.post("/welcome", welcome);
user_Router.post("/signup", signup);
user_Router.post("/login", login);
export default user_Router;
