import express from "express"
import { checkSignIn, checkSignUp, middleToken } from "../middlewares/authMiddleware.js"
import { getCreatedImageByUser, getSavedImageByUser, getUserInfo, login, register } from "../controllers/userController.js"

const userRouter = express.Router()


//Register route
userRouter.post("/sign-up",checkSignUp,register)

//Login route
userRouter.post("/sign-in",checkSignIn,login)

//Get user info
userRouter.get("/info",middleToken,getUserInfo)

//Get saved image by user
userRouter.get("/saved-image",middleToken,getSavedImageByUser)

//Get created image by user
userRouter.get("/created-image",middleToken,getCreatedImageByUser)

export default userRouter