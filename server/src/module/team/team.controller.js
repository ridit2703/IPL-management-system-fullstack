import * as teamService from "./team.service.js"
import ApiResponse from "../../common/utils/api-response.js"



const getAllTeamsController=async(req,res)=>{
    try {
        console.log("1. Controller started");
        const teams=await teamService.getAllTeams();

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

const updateTeamController=async(req,res)=>{
    try {
        const team=await teamService.updateTeam(req.params.id,req.body)
        
        return ApiResponse.success(res,"Team updated successfully",team)
    } catch (error) {
        
    }
}

const deleteTeamController = async (req, res, ) => {
    try {
        const team = await teamService.deleteTeam(req.params.id);

        return ApiResponse.success(
            res,
            "Team Deleted Successfully",
            team
        );
    } catch (error) {
        
    }
};
export {getAllTeamsController,createTeamController,updateTeamController,deleteTeamController}