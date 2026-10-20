
import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import CreateTeamDto from "./dto/create-team.dto.js";
import { createTeamController, getAllTeamsController } from "./team.controller.js";

const router = Router();


router.get("/",getAllTeamsController)
router.post("/create",validate(CreateTeamDto),createTeamController);

export default router;