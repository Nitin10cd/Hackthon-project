import express from "express";
import { loginUser, registerUser } from "../Controllers/User.controller.js";

const UserRouter = express.Router();
UserRouter.post('/register', registerUser);
UserRouter.post("/login", loginUser);
export default UserRouter;
