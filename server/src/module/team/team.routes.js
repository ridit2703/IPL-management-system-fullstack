
import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import CreateTeamDto from "./dto/create-team.dto.js";
import { createTeamController, getAllTeamsController,updateTeamController,deleteTeamController} from "./team.controller.js";

import updateTeamDto from "./dto/update-team.dto.js"
const router = Router();


router.get("/",getAllTeamsController)

router.post("/create",validate(CreateTeamDto),createTeamController);

router.patch("/:id",validate(updateTeamDto),updateTeamController);

router.delete("/:id", deleteTeamController);
export default router;