import * as teamService from "./team.service.js"
import ApiResponse from "../../common/utils/api-response.js"



const getAllTeamsController=async(req,res)=>{
    try {
        const teams=await teamService.getAllTeamsController();

        return ApiResponse.success(res,"Teams Fetched Successfully",teams);
        
    } catch (error) {
        
    }
}


const createTeamController=async(req,res)=>{
    try {
        const team=await teamService.createTeam(req.body)
         ApiResponse.created(res,"Team Created Successfully",team )
        
    } catch (error) {


        
    }
}
export {getAllTeamsController,createTeamController}