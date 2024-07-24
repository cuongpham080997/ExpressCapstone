import multer from "multer";
import { verifyToken } from "../config/jwt.js";
import { responseSend } from "../config/response.js";
import { upload } from "../config/upload.js";

const checkBlankField = (requiredFiled) => (req, res, next) => {
  console.log(123,req.body)
  const missingField = requiredFiled.find((field) => !req.body[field]);
  if (missingField)
    return responseSend(res, "", `${missingField} is blank`, 404);
  next();
};

const checkSignUp = checkBlankField(["ho_ten", "mat_khau", "email", "tuoi"]);
const checkSignIn = checkBlankField(["email", "mat_khau"]);
const checkComment = checkBlankField(["hinh_id", "noi_dung"]);
const checkCreateImg = checkBlankField(["ten_hinh", "mo_ta"]);
const checkEditUser = checkBlankField(["ho_ten","email","tuoi"]);
const middleToken = (req, res, next) => {
  let { token } = req.headers;
  if (!token) res.status(401).send("Token not found");
  let error = verifyToken(token);

  if (error) res.status(401).send(error.name);
  else next();
};

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    responseSend(res, null, err.message, 400);
  } else if (err) {
    responseSend(res, null, err.message, 500);
  }
  next();
};

const handleUploadImage = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    next();
  });
};

export {
  checkSignUp,
  checkSignIn,
  middleToken,
  checkComment,
  checkCreateImg,
  handleUploadImage,
  checkEditUser
};
