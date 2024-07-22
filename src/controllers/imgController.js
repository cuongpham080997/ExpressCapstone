import {
  addCommentService,
  checkSavedImageService,
    getCommentListService,
  getImageListService,
  getImgDetailService,
  searchImgNameService,
} from "../services/imgService.js";
import { responseSend } from "../config/response.js";

const getImageList = async (_, res) => {
  try {
    const result = await getImageListService();
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const searchImgName = async (req, res) => {
  try {
    const result = await searchImgNameService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getImgDetail = async (req, res) => {
  try {
    const result = await getImgDetailService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getCommentList = async (req,res) => {
  try {
    const result = await getCommentListService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const checkSavedImage = async (req,res) => {
  try{
    const result = await checkSavedImageService(req)
    responseSend(res, result, "Successful!", 200);
  }catch(err){
    responseSend(res,null,err.message,err.status)
  }
}

const addComment = async (req, res) => {
  try{
    const result = await addCommentService (req)
    responseSend(res, result, "Successful!", 200);
  }catch(err){
    responseSend(res,null,err.message,err.status)
    
  }
}

export { getImageList, searchImgName, getImgDetail, getCommentList,checkSavedImage,addComment };
