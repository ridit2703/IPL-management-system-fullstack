
import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";

const register=async({name,email,password,role})=>{
    const existing=await User.findOne({email})
    if(existing){
        throw ApiError.conflict("Email already exists")
    }

    const user=await User.create({
        name,
        email,
        password,
        role,

    })

    console.log(user);
    return user;

}

export {register}