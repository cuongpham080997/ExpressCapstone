import e from "express";
import multer, { diskStorage } from "multer";
export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, cb) => {
      let date = new Date();
      cb(null, date.getTime() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});
