import Joi from"joi";
import BaseDto from "../../../common/dto/base.dto.js";

class UpdateTeamDto extends BaseDto{
    static schema =Joi.object({
        name:Joi.string().trim().min(2).max(50),
         shortName: Joi.string().trim().min(2).max(10),
        logo: Joi.string().trim().uri()
    }).min(1)
}
export default UpdateTeamDto