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

export { createPlayerController };
