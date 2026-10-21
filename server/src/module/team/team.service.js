import ApiError from "../../common/utils/api-error.js";
import Team from "./team.model.js";



const getAllTeams=async()=>{
  const teams=await Team.find().sort({name:1});

  console.log(teams)
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

const updateTeam=async(id,data)=>{
  const team=await Team.findOneAndUpdate(id)

  if(!team){
    throw ApiError.notFound("Team not Found");
  }

  if(data.name!==undefined){
    team.name=data.name.trim()
  }

  if (data.shortName !== undefined) {
        team.shortName = data.shortName.trim().toUpperCase();
    }

    if (data.logo !== undefined) {
        team.logo = data.logo.trim();
    }
    await team.save()
    return team;
}


const deleteTeam = async (id) => {
    const team = await Team.findById(id);

    if (!team) {
        throw ApiError.notFound("Team not found");
    }

    await Team.findByIdAndDelete(id);
    console.log(team)

    return team;
};
export {getAllTeams, createTeam ,updateTeam,deleteTeam};