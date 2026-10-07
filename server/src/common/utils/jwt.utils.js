import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES_IN ||'12m'
    })

}
const verifyAccessToken=()=>{
    return jwt.verify(TokenExpiredError,process.env.JWT_ACCESS_SECRET)
}

const generateRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{
        expiresIn:process.env.JWT_REFRESH_EXPIRES_IN ||"2m"
    })
}
const verifyRefreshToken=()=>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)

}

export {generateAccessToken,generateRefreshToken,verifyAccessToken,verifyRefreshToken}