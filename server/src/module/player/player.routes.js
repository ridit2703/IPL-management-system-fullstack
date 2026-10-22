import { Router } from "express";

import validate from "../../common/middleware/validate.middleware.js";

import CreatePlayerDto from "./dto/create-player.dto.js";
import UpdatePlayerDto from "./dto/update-player.dto.js";

import {
  createPlayerController,
  getAllPlayersController,
  updatePlayerController,
  deletePlayerController
} from "./player.controller.js";

const router = Router();

// GET all players
router.get("/", getAllPlayersController);

// CREATE player
router.post(
  "/create",
  validate(CreatePlayerDto),
  createPlayerController
);

// UPDATE player
router.patch(
  "/:id",
  validate(UpdatePlayerDto),
  updatePlayerController
);

// DELETE player
router.delete("/:id", deletePlayerController);

export default router;