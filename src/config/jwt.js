import jwt from "jsonwebtoken"

const createToken = data => jwt.sign({data},process.env.SECRET,{algorithm:"HS256",expiresIn:"60d"})
const verifyToken = token => jwt.verify(token,process.env.SECRET,error => error)
export { createToken, verifyToken}