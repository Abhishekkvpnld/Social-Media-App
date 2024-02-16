import  express  from "express";
import { verifyToken } from "../middlewares/verify.js";
import {userStatus} from "../controller/status.js"

const router = express.Router();

/** PUT**/
router.post('/:userId',verifyToken,userStatus);

export default router;