
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


const getOwnerProfile = async (userId) => {
  const owner = await User.findOne({
    _id: userId,
    role: "owner",
  })
    .select("-password -refreshToken")
    .populate("team");

  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }

  return owner;
};

// UPDATE OWNER
const updateOwner = async (userId, updateData) => {
  const owner = await User.findOne({
    _id: userId,
    role: "owner",
  });

  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }

  // Only allow updating these fields
  if (updateData.name !== undefined) {
    owner.name = updateData.name;
  }

  if (updateData.email !== undefined) {
    const email = updateData.email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email,
      _id: { $ne: owner._id },
    });

    if (existingUser) {
      throw ApiError.conflict("Email already exists");
    }

    owner.email = email;
  }

  if (updateData.password !== undefined) {
    owner.password = updateData.password;
  }

  await owner.save();

  return {
    _id: owner._id,
    name: owner.name,
    email: owner.email,
    role: owner.role,
    team: owner.team,
  };
};


// DELETE OWNER
const deleteOwner = async (userId) => {
  const owner = await User.findOneAndDelete({
    _id: userId,
    role: "owner",
  });

  if (!owner) {
    throw ApiError.notFound("Owner not found");
  }

  return true;
};


export { createOwner,getOwnerProfile ,updateOwner,deleteOwner};
