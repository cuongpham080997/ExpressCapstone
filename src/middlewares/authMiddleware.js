import { responseSend } from "../config/response.js";

const checkBlankField = (requiredFiled) => (req,res,next) =>{
    const missingField = requiredFiled.find(field => !req.body[field])
    if(missingField) return responseSend(res,"",`${missingField} is blank`,404)
    next()
}

const checkSignUp = checkBlankField(["ho_ten", "mat_khau", "email", "tuoi"]);
const checkSignIn = checkBlankField(["email", "mat_khau"]);
export { checkSignUp,checkSignIn };
