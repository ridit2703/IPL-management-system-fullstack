import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import CreatePlayerDto from "./dto/create-player.dto.js";
import { createPlayerController } from "./player.controller.js";

const router = Router();

// router.post(
//     "/create",
//     validate(CreatePlayerDto),
//     createPlayerController
// );

router.post("/create", (req, res) => {
    console.log("1. Player route reached");

    return res.status(200).json({
        message: "Player route is working"
    });
});
export default router;
