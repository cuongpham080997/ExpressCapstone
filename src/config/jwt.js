import jwt from "jsonwebtoken"

export const createToken = data => jwt.sign({data},process.env.SECRET,{algorithm:"ES256",expiresIn:"60d"})