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

const getAllPlayers = async () => {
  const players = await Player.find()
    .populate("team", "name shortName logo")
    .sort({ name: 1 });

  return players;
};
const updatePlayer = async (id, data) => {
  if (!mongoose.isValidObjectId(id)) {
    throw ApiError.badRequest("Invalid player ID");
  }

  // If a new team ID is provided, check that the team exists.
  if (data.team) {
    if (!mongoose.isValidObjectId(data.team)) {
      throw ApiError.badRequest("Invalid team ID");
    }

    const existingTeam = await Team.findById(data.team);

    if (!existingTeam) {
      throw ApiError.notFound("Team not found");
    }
  }
 const player = await Player.findByIdAndUpdate(
    id,
    { $set: data },
    {
      new: true,
      runValidators: true
    }
  ).populate("team", "name shortName logo");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};

const deletePlayer = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw ApiError.badRequest("Invalid player ID");
  }

  const player = await Player.findByIdAndDelete(id);

  if (!player) {
    throw ApiError.notFound("Player not found");
  }

  return player;
};
export { createPlayer,getAllPlayers,
  updatePlayer,
  deletePlayer };