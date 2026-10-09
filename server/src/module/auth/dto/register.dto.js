import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
    static schema =Joi.object({
        name:Joi.string().trim().min(2).required(),
        email:Joi.string().email().lowercase().required(),
        password:Joi.string().min(8).message("password must be 8 char long").required(),
        role:Joi.string().valid("admin","owner","player","user").default("user")
    })
}
export default RegisterDto