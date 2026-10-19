import * as teamService from "./team.service.js"
import ApiResponse from "../../common/utils/api-response.js"
const createTeamController=async(req,res)=>{
    try {
        const team=await teamService.createTeam(req.body)
         ApiResponse.created(res,"Team Created Successfully",team )
        
    } catch (error) {


        
    }
}
export {createTeamController}