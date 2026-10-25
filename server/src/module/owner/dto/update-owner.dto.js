
import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class UpdateOwnerDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(35),

    email: Joi.string().trim().email().lowercase(),

    password: Joi.string().min(8),
  }).min(1);
}

export default UpdateOwnerDto;
