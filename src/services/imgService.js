import { Op } from "sequelize";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { createError } from "../config/createError.js";
import { decodeToken } from "../config/jwt.js";

const model = initModels(sequelize);

const getImageListService = async () => {
  try {
    let data = await model.hinh_anh.findAll();
    return data;
  } catch (err) {
    throw err;
  }
};

const searchImgNameService = async (req) => {
  try {
    let { keyword } = req.query;
    let data = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

const getImgDetailService = async (req) => {
  try {
    let { id } = req.params;

    let data = await model.hinh_anh.findByPk(id, {
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: [],
        },
      ],
      attributes: [
        "hinh_id",
        "nguoi_dung_id",
        "ten_hinh",
        "duong_dan",
        "mo_ta",
        "nguoi_dung.ho_ten",
        "nguoi_dung.email",
        "nguoi_dung.tuoi",
        "nguoi_dung.anh_dai_dien",
      ],
      raw: true,
    });
    if (!data) throw createError("Image Not found", 404);
    return data;
  } catch (err) {
    throw err;
  }
};

const getCommentListService = async (req) => {
  try {
    let { id } = req.params;

    let data = await model.binh_luan.findAll({
      where: {
        hinh_id: id,
      },
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: [],
        },
        {
          model: model.hinh_anh,
          as: "hinh",
          attributes: [],
        },
      ],
      attributes: [
        "binh_luan_id",
        "nguoi_dung.ho_ten",
        "nguoi_dung.email",
        "nguoi_dung.tuoi",
        "nguoi_dung.anh_dai_dien",
        "hinh.ten_hinh",
        "hinh.duong_dan",
        "hinh.mo_ta",
        "noi_dung",
        "ngay_binh_luan",
      ],
      raw: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

const checkSavedImageService = async (req) => {
  try {
    const { id } = req.params;
    const { token } = req.headers;
    let { data } = decodeToken(token);
    const result = await model.luu_anh.findAll({
      where: {
        nguoi_dung_id: data.userId,
        hinh_id: id,
      },
    });
    if (!result.length) throw createError("Image Not found", 404);
    return result;
  } catch (err) {
    throw err;
  }
};

const addCommentService = async (req) => {
  try {
    const { hinh_id, noi_dung } = req.body;
    const { token } = req.headers;
    let { data } = decodeToken(token);
    const checkImageExist = await model.hinh_anh.findByPk(hinh_id)
    const checkUserExist = await model.nguoi_dung.findByPk(data.userId)
    if(checkImageExist && checkUserExist) {
      return await model.binh_luan.create({
        nguoi_dung_id: data.userId,
        hinh_id,
        noi_dung,
        ngay_binh_luan: new Date(),
      })
    }else throw createError("Invalid nguoi_dung_id or hinh_id")
  } catch (err) {
    throw err;
  }
};

export {
  getImageListService,
  searchImgNameService,
  getImgDetailService,
  getCommentListService,
  checkSavedImageService,
  addCommentService,
};
