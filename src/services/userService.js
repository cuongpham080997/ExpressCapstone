import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { createError } from "../config/createError.js";
import { createToken } from "../config/jwt.js";
let model = initModels(sequelize);

const registerService = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;

    //Check exist email
    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw createError("Email already exists",409)
    } else {
      let newUser = {
        email,
        mat_khau: bcrypt.hashSync(mat_khau, 10),
        ho_ten,
        tuoi,
        anh_dai_dien: null,
      };
      let result = await model.nguoi_dung.create(newUser);
      delete result.dataValues.mat_khau
      return result;
    }
  } catch (err) {
    throw err;
  }
};

const loginService = async (req,res) => {
  try{
    let {email,mat_khau} = req.body
    let checkUser = await model.nguoi_dung.findOne({
      where:{
        email,
      }
    })

    if(!checkUser) throw createError("Incorrect email or password",401)
    if (bcrypt.compareSync(mat_khau,checkUser.mat_khau)){
      let token = createToken({userId:checkUser.nguoi_dung_id})
      return token
    }else throw createError("Incorrect password",401)
  }catch(err){
    throw err;
  }
}

export { registerService,loginService };
