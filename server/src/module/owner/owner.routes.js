
import { Router } from "express";
import { createOwnerController } from "./owner.controller.js";
import validate from "../../common/middleware/validate.js";
import CreateOwnerDto from "./dto/create-owner.dto.js";

const router = Router();

router.post(
  "/create",
  validate(CreateOwnerDto),
  createOwnerController
);

export default router;
