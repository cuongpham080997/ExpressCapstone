import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createError } from "../config/createError.js";
import { createToken, decodeToken } from "../config/jwt.js";
let model = initModels(sequelize);

const registerService = async (req) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;

    //Check exist email
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw createError("Email already exists", 409);
    } else {
      let newUser = {
        email,
        mat_khau: bcrypt.hashSync(mat_khau, 10),
        ho_ten,
        tuoi,
        anh_dai_dien: null,
      };
      let result = await model.nguoi_dung.create(newUser);
      delete result.dataValues.mat_khau;
      return result;
    }
  } catch (err) {
    throw err;
  }
};

const loginService = async (req) => {
  try {
    let { email, mat_khau } = req.body;
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) throw createError("Incorrect email or password", 401);
    if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
      let token = createToken({ userId: checkUser.nguoi_dung_id });
      return token;
    } else throw createError("Incorrect password", 401);
  } catch (err) {
    throw err;
  }
};

const getUserInfoService = async (req) => {
  try {
    const { token } = req.headers;
    const { data } = decodeToken(token);
    const result = await model.nguoi_dung.findByPk(data.userId);
    if (!result) throw createError("User not found", 404);
    delete result.dataValues.mat_khau;
    return result;
  } catch (err) {
    throw err;
  }
};

const getSavedImageByUserService = async (req) => {
  try {
    const { token } = req.headers;
    const { data } = decodeToken(token);
    const result = await model.luu_anh.findAll({
      where: {
        nguoi_dung_id: data.userId,
      },
      include: [
        {
          model: model.hinh_anh,
          as: "hinh",
          attributes: [],
        },
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: [],
        },
      ],
      attributes: [
        "nguoi_dung_id",
        "hinh_id",
        "ngay_luu",
        "nguoi_dung.ho_ten",
        "nguoi_dung.email",
        "nguoi_dung.tuoi",
        "hinh.ten_hinh",
        "hinh.duong_dan",
        "hinh.mo_ta",
      ],
      raw: true,
    });
    if (!result.length) throw createError("Image not found", 404);
    return result;
  } catch (err) {
    throw err;
  }
};

const getCreatedImageByUserService = async (req) => {
  try {
    const { token } = req.headers;
    const { data } = decodeToken(token);
    const result = await model.hinh_anh.findAll({
      where: {
        nguoi_dung_id: data.userId,
      },
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
          attributes: [],
        },
      ],
      attributes: [
        "nguoi_dung_id",
        "hinh_id",
        "nguoi_dung.ho_ten",
        "nguoi_dung.email",
        "nguoi_dung.tuoi",
        "ten_hinh",
        "duong_dan",
        "mo_ta",
      ],
      raw: true,
    });
    if (!result.length) throw createError("Image not found", 404);
    return result;
  } catch (err) {
    throw err;
  }
};
const updateUserService = async (req) => {
  try {
    let {file} = req
    let {ho_ten,email,tuoi} = req.body
    console.log(ho_ten)
    let {token} = req.headers
    let {data} = decodeToken(token)
    await model.nguoi_dung.update({
      email,
      ho_ten,
      tuoi,
      anh_dai_dien: file ? file.filename : null,
    },{
      where:{
        nguoi_dung_id: data.userId
      },
      returning: true
    })

    let result = await model.nguoi_dung.findByPk(data.userId)
    delete result.dataValues.mat_khau
    return result
    
  } catch (err) {
    throw err;
  }
};

export {
  registerService,
  loginService,
  getUserInfoService,
  getSavedImageByUserService,
  getCreatedImageByUserService,
  updateUserService,
};
