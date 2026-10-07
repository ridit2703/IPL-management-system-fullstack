

import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js";


const register=async(req,res)=>{
    const user =await authService.register(req.body)
    ApiResponse.created(res,"Registration success",user )



}

const login=async(req,res)=>{
   
    const {user,accessToken,refreshToken}=await authService.login(req.body)

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        maxAge:7*24*60*60*1000,
    })
    ApiResponse.ok(res,"Login Successfully",{user,accessToken})
}
const logout=async (req,res)=>{
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken");
    ApiResponse.ok(res,"logout Successfuly")
}
export {register,login,logout} 