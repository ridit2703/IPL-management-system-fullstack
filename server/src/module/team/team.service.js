import ApiError from "../../common/utils/api-error.js";
import Team from "./team.model.js";

const createTeam = async (name, shortName, logo) => {
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

export { createTeam };