import { verifyToken } from "../config/jwt.js";
import { responseSend } from "../config/response.js";

const checkBlankField = (requiredFiled) => (req, res, next) => {
  const missingField = requiredFiled.find((field) => !req.body[field]);
  if (missingField)
    return responseSend(res, "", `${missingField} is blank`, 404);
  next();
};

const checkSignUp = checkBlankField(["ho_ten", "mat_khau", "email", "tuoi"]);
const checkSignIn = checkBlankField(["email", "mat_khau"]);

const middleToken = (req, res, next) => {
  let { token } = req.headers;
  if(!token) res.status(401).send("Token not found")
  let error = verifyToken(token);

  if (error) res.status(401).send(error.name);
  else next();
};

export { checkSignUp, checkSignIn,middleToken };
