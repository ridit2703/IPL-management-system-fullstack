
import { Router } from "express";
import { createOwnerController, deleteOwnerController, getOwnerProfileController ,updateOwnerController} from "./owner.controller.js";
import validate from "../../common/middleware/validate.js";
import CreateOwnerDto from "./dto/create-owner.dto.js";

const router = Router();

router.post(
  "/create",
  validate(CreateOwnerDto),
  createOwnerController
);

router.post("/",getOwnerProfileController);

router.patch(
  "/profile",
  
  validate(UpdateOwnerDto),
  updateOwnerController
);

router.delete("/:id",deleteOwnerController)

export default router;
