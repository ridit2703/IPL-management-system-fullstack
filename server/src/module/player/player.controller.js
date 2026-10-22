import * as playerService from "./player.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const createPlayerController = async (req, res) => {
    try {
        const player = await playerService.createPlayer(req.body);

        return ApiResponse.created(
            res,
            "Player Created Successfully",
            player
        );
    } catch (error) {
        
    }
};
const getAllPlayersController = async (req, res, next) => {
  try {
    const players = await playerService.getAllPlayers();

    return ApiResponse.ok(
      res,
      "Players fetched successfully",
      players
    );
  } catch (error) {
    next(error);
  }
};
const updatePlayerController = async (req, res, next) => {
  try {
    const player = await playerService.updatePlayer(
      req.params.id,
      req.body
    );

    return ApiResponse.ok(
      res,
      "Player updated successfully",
      player
    );
  } catch (error) {
    next(error);
  }
};
const deletePlayerController = async (req, res, next) => {
  try {
    const player = await playerService.deletePlayer(req.params.id);

    return ApiResponse.ok(
      res,
      "Player deleted successfully",
      player
    );
  } catch (error) {
    next(error);
  }
};
export { createPlayerController,getAllPlayersController,
  updatePlayerController,
  deletePlayerController };
