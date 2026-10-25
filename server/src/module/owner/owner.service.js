
import User from "../auth/auth.model.js";
import Team from "../team/team.model.js";
import ApiError from "../../common/utils/api-error.js";

const createOwner = async ({ name, email, password, team }) => {

  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  
  const existingTeam = await Team.findById(team);

  if (!existingTeam) {
    throw ApiError.notFound("Team not found");
  }

  
  const existingOwner = await User.findOne({
    role: "owner",
    team: existingTeam._id,
  });

  if (existingOwner) {
    throw ApiError.conflict("This team already has an owner");
  }

  
  const owner = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: "owner",
    team: existingTeam._id,
  });

 
  const ownerObject = owner.toObject();
  delete ownerObject.password;

  return ownerObject;
};

export { createOwner };
