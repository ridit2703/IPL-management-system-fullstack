import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class CreateOwnerDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(35).required(),

    email: Joi.string().trim().email().lowercase().required(),

    password: Joi.string().min(8).required(),

    team: Joi.string().hex().length(24).required(),
  });
}

export default CreateOwnerDto;