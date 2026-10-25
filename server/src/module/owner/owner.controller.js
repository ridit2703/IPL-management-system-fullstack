
import { createOwner } from "./owner.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const createOwnerController = async (req, res, next) => {
  try {
    const owner = await createOwner(req.body);

    return ApiResponse.created(
      res,
      "Owner created successfully",
      owner
    );
  } catch (error) {
    next(error);
  }
};

const getOwnerProfileController = async (req, res, next) => {
  try {
    const owner = await getOwnerProfile(req.user.id);

    return ApiResponse.ok(
      res,
      "Owner profile fetched successfully",
      owner
    );
  } catch (error) {
    next(error);
  }
};

// UPDATE OWNER CONTROLLER
const updateOwnerController = async (req, res, next) => {
  try {
    const owner = await updateOwner(req.user.id, req.body);

    return ApiResponse.ok(
      res,
      "Owner updated successfully",
      owner
    );
  } catch (error) {
    next(error);
  }
};


// DELETE OWNER CONTROLLER
const deleteOwnerController = async (req, res, next) => {
  try {
    await deleteOwner(req.user.id);

    return ApiResponse.ok(
      res,
      "Owner deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};


export { createOwnerController,getOwnerProfileController ,updateOwnerController,deleteOwnerController};





