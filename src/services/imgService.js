import { Op } from "sequelize";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { createError } from "../config/createError.js";

const model = initModels(sequelize);

const getImageListService = async () => {
  try {
    let data = await model.hinh_anh.findAll();
    return data;
  } catch (err) {
    throw err;
  }
};

const searchImgNameService = async (req, res) => {
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

const getImgDetailService = async (req, res) => {
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

const getCommentListService = async (req,res) => {
    let {id} = req.params
};

export {
  getImageListService,
  searchImgNameService,
  getImgDetailService,
  getCommentListService,
};
