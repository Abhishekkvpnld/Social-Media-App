import  express  from "express";
import { verifyToken } from "../middlewares/verify.js";
import {firendStatus, userStatus} from "../controller/status.js"

const router = express.Router();

/** POST**/
router.post('/:userId',verifyToken,userStatus);

router.post('/friendStatus/:userFriends',verifyToken,firendStatus)

export default router;