import mongoose from "mongoose";
import ApiError from "../../common/utils/api-error.js";
import Player from "./player.model.js";
import Team from "../team/team.model.js";

const createPlayer = async (data) => {
    const {
        name,
        age,
        role,
        nationality,
        team,
        photo,
        runs,
        wickets,
        isActive
    } = data;

   
    if (!mongoose.isValidObjectId(team)) {
        throw ApiError.badRequest("Invalid team ID");
    }

    
    const existingTeam = await Team.findById(team);

    if (!existingTeam) {
        throw ApiError.notFound("Team not found");
    }

   
    const player = await Player.create({
        name,
        age,
        role,
        nationality,
        team,
        photo,
        runs,
        wickets,
        isActive
    });

    
    return player;
};

export { createPlayer };