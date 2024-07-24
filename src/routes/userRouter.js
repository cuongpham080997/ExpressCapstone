import express from "express";
import {
  checkEditUser,
  checkSignIn,
  checkSignUp,
  handleUploadImage,
  middleToken,
} from "../middlewares/authMiddleware.js";
import {
  getCreatedImageByUser,
  getSavedImageByUser,
  getUserInfo,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

//Register route
userRouter.post("/sign-up", checkSignUp, register);

//Login route
userRouter.post("/sign-in", checkSignIn, login);

//Get user info
userRouter.get("/info", middleToken, getUserInfo);

//Get saved image by user
userRouter.get("/saved-image", middleToken, getSavedImageByUser);

//Get created image by user
userRouter.get("/created-image", middleToken, getCreatedImageByUser);

//Update user
userRouter.put(
  "/update",
  middleToken,
  handleUploadImage("avatar"),
  checkEditUser,
  updateUser
);

export default userRouter;
