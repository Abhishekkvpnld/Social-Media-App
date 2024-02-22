import express from "express";
import { verifyToken } from "../middlewares/verify.js";
import { getFeedPost,getUserPost,likePost } from "../controller/posts.js"

const router = express.Router();

/* READ */
 router.get("/",verifyToken,getFeedPost);
router.get("/:userId/posts",getUserPost);

/* UPDATE */
router.put("/:id/like",likePost);

export default router; 