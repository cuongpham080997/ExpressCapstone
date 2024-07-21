import express from "express"
import userRouter from "./userRouter.js"
import imgRouter from "./imgRouter.js"

const rootRouter = express.Router()

rootRouter.use("/user",userRouter)
rootRouter.use("/img",imgRouter)

export default rootRouter