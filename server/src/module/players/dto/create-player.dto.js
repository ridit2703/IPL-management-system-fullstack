import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class CreatePlayerDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),

        age: Joi.number().integer().min(16).max(50).required(),

        role: Joi.string()
            .valid("Batsman", "Bowler", "All-Rounder", "Wicket-Keeper")
            .required(),

        nationality: Joi.string().trim().min(2).max(50).required(),

        team: Joi.string()
            .hex()
            .length(24)
            .required(),

        photo: Joi.string().trim().uri().allow(""),

        runs: Joi.number().integer().min(0).default(0),

        wickets: Joi.number().integer().min(0).default(0),

        isActive: Joi.boolean().default(true)
    });
}

export default CreatePlayerDto;