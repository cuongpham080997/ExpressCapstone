import { responseSend } from "../config/response.js";
import {
  getCreatedImageByUserService,
  getSavedImageByUserService,
  getUserInfoService,
  loginService,
  registerService,
} from "../services/userService.js";

const register = async (req, res) => {
  try {
    const result = await registerService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const login = async (req, res) => {
  try {
    const result = await loginService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const result = await getUserInfoService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getSavedImageByUser = async (req, res) => {
  try {
    const result = await getSavedImageByUserService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};

const getCreatedImageByUser = async (req, res) => {
  try {
    const result = await getCreatedImageByUserService(req);
    responseSend(res, result, "Successful!", 200);
  } catch (err) {
    responseSend(res, null, err.message, err.status);
  }
};


export {
  register,
  login,
  getUserInfo,
  getSavedImageByUser,
  getCreatedImageByUser,
};
