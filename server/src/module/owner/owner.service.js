
import User from "../auth/auth.model.js";
import Team from "../team/team.model.js";
import ApiError from "../../common/utils/api-error.js";

const createOwner = async ({ name, email, password, team }) => {
  // 1. Check whether the email is already registered
  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  // 2. Check whether the team exists
  const existingTeam = await Team.findById(team);

  if (!existingTeam) {
    throw ApiError.notFound("Team not found");
  }

  // 3. Check whether this team already has an owner
  const existingOwner = await User.findOne({
    role: "owner",
    team: existingTeam._id,
  });

  if (existingOwner) {
    throw ApiError.conflict("This team already has an owner");
  }

  // 4. Create the owner account
  const owner = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: "owner",
    team: existingTeam._id,
  });

  // 5. Return owner details without the password
  const ownerObject = owner.toObject();
  delete ownerObject.password;

  return ownerObject;
};

export { createOwner };
