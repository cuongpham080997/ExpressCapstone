import express from "express"
import { checkSignIn, checkSignUp } from "../middlewares/authMiddleware.js"
import { login, register } from "../controllers/userController.js"

const userRouter = express.Router()


//Register route
userRouter.post("/sign-up",checkSignUp,register)

//Login route
userRouter.post("/sign-in",checkSignIn,login)


export default userRouter