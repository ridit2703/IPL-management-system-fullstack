
import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import crypto from "crypto"
import { generateAccessToken,generateRefreshToken } from "../../common/utils/jwt.utils.js";


const hashToken=(token)=>{
    crypto.createHash("sha256").update(token).digest("hex")
}

const register=async({name,email,password,role})=>{
    const existing=await User.findOne({email})
    if(existing){
        throw ApiError.conflict("Email already exists")
    }
    // const {rawToken,hashedToken}=generate

    const user=await User.create({
        name,
        email,
        password,
        role,

    })

    console.log(user);
    return user;

}

const login=async({email,password})=>{
   const user= await User.findOne({email}).select("+password")
   if(!user){
    throw ApiError.unauthorized("Invalid email or password");

   }
   const isMatch=await user.comparePassword(password)
   if(!isMatch){
    throw ApiError.unauthorized("Invalid email or password  ")
   }
   const accessToken=generateAccessToken({
    id:user._id,
    role:user.role
   })
   const refreshToken=generateRefreshToken({
    id:user._id
   })
   user.refreshToken=hashToken(refreshToken)

   await user.save({validateBeforeSave:false})

   const userObj=user.toObject()

   delete userObj.password;
   delete userObj.refreshToken;

   return {
    user:userObj,
    accessToken,
    refreshToken
   }
}
const logout = async (userId) => {

    await User.findByIdAndUpdate(
        userId,
        { refreshToken: null }
    );

};

export {register,login,logout}