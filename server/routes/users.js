import express from "express";
import { verifyToken } from "../middlewares/verify.js";
import {
    getUser,
    getUserFriends,
addRemoveFriend
} from "../controller/users.js"

const router = express.Router();

/* READ */
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

/* UPDATE */
router.put("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;