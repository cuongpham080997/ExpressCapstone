import { responseSend } from "../config/response.js"
import { loginService, registerService } from "../services/userService.js"



const register = async (req,res,next) => {
    try{
        const result = await registerService(req,res)
        responseSend(res,result,"Successful!",200)
    }catch(err){
        console.log(err)
        responseSend(res,null,err.message,err.status)
    }
}

const login = async (req,res) => {
        try{
            const result = await loginService(req,res)
            responseSend(res,result,"Successful!",200)
        }catch(err){
            console.log(err)
            responseSend(res,null,err.message,err.status)
        }
}


export {
    register,
    login
}