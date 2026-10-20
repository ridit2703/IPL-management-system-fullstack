import ApiError from "../../common/utils/api-error.js";
import Team from "./team.model.js";



const getAllTeams=async()=>{
  const teams=await Team.find().sort({name:1});
  return teams
}


const createTeam = async ({name, shortName, logo}) => {
  const normalizedName = name.trim();
  const normalizedShortName = shortName.trim().toUpperCase();

  const existing = await Team.findOne({
    $or: [
      { name: normalizedName },
      { shortName: normalizedShortName },
    ],
  });

  if (existing) {
    throw ApiError.conflict(
      "Team name or short name already exists"
    );
  }

  const team = await Team.create({
    name: normalizedName,
    shortName: normalizedShortName,
    logo: logo.trim(),
  });

  return team;
};

export {getAllTeams, createTeam };