import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class UpdatePlayerDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(50),
    age: Joi.number().integer().min(16).max(50),

    role: Joi.string().valid(
      "Batsman",
      "Bowler",
      "All-Rounder",
      "Wicket-Keeper"
    ),

    nationality: Joi.string().trim().min(2).max(50),

    team: Joi.string().hex().length(24),

    photo: Joi.string().trim().uri().allow(""),

    runs: Joi.number().integer().min(0),
    wickets: Joi.number().integer().min(0),

    isActive: Joi.boolean()
  }).min(1);
}

export default UpdatePlayerDto;