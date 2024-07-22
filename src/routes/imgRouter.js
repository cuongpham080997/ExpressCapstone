import express from "express";
import { checkComment, middleToken } from "../middlewares/authMiddleware.js";
import {
  addComment,
  checkSavedImage,
  getCommentList,
  getImageList,
  getImgDetail,
  searchImgName,
} from "../controllers/imgController.js";

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

export default imgRouter;
