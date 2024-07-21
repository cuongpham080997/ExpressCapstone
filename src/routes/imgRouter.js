import express from "express";
import { middleToken } from "../middlewares/authMiddleware.js";
import {
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

export default imgRouter;
