
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

export { createOwnerController };





