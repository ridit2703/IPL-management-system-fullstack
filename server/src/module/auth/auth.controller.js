

import * as authService from "./auth.services.js";
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js";


const register=async(req,res)=>{
    const user =await authService.register(req.body)
    ApiResponse.created(res,"Registration success",user )



}
export {register} 