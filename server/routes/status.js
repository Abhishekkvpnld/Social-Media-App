import  express  from "express";
import { verifyToken } from "../middlewares/verify.js";
import { userStatus} from "../controller/status.js"
import {attachmentsMulter} from "../data/attachmentMulter.js";

const router = express.Router();

/** POST**/
// router.post('/:userId',verifyToken,userStatus);

/** GET **/
// router.get('/friendStatus/:userId',verifyToken,firendStatus)

export default router;