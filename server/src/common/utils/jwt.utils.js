import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{
        expiresIn:process.env.JWT_ACCESS_EXPIRES_IN ||'12m'
    })

}