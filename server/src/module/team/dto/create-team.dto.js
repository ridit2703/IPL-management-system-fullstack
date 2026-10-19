import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class CreateTeamDto extends BaseDto{
    static schema=Joi.object({
        name:Joi.string().trim().min(2).max(100).required(),
        shortName:Joi.string().required().trim().uppercase().max(10).min(2),
        logo: Joi.string().trim().uri().required()
    }).required();
}