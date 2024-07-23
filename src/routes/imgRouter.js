import express from "express";
import { checkComment, checkCreateImg, middleToken } from "../middlewares/authMiddleware.js";
import {
  addComment,
  checkSavedImage,
  createImage,
  deleteImage,
  getCommentList,
  getImageList,
  getImgDetail,
  searchImgName,
} from "../controllers/imgController.js";
import { upload } from "../config/upload.js";

const imgRouter = express.Router();

// Get img list
imgRouter.get("/lst", middleToken, getImageList);

// Search imgs via name
imgRouter.get("/search", middleToken, searchImgName);

//Get img detail
imgRouter.get("/img-detail/:id", middleToken, getImgDetail);

//Get comment list via image
imgRouter.get("/comments/:id", middleToken, getCommentList);

//Get saved image via hinh_id
imgRouter.get("/saved/:id",middleToken,checkSavedImage)

//add comment
imgRouter.post("/create-comment",middleToken,checkComment,addComment)

//delete created image
imgRouter.delete("/del-created/:id",middleToken,deleteImage)

//Create image
imgRouter.post("/create-img",middleToken,upload.single("hinhAnh"),checkCreateImg,createImage)

export default imgRouter;
