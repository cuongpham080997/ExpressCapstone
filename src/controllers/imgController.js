import {
    getCommentListService,
  getImageListService,
  getImgDetailService,
  searchImgNameService,
} from "../services/imgService.js";
import { responseSend } from "../config/response.js";

const getImageList = async (req, res) => {
  try {
    const result = await getImageListService();
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const searchImgName = async (req, res) => {
  try {
    const result = await searchImgNameService(req, res);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getImgDetail = async (req, res) => {
  try {
    const result = await getImgDetailService(req, res);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getCommentList = async (req,res) => {
  try {
    const result = await getCommentListService(req,res);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

export { getImageList, searchImgName, getImgDetail, getCommentList };
