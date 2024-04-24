import  express  from "express";
import { verifyToken } from "../middlewares/verify.js";
import { deleteStatus, getUserStatus, userStatus} from "../controller/status.js"
import {attachmentsMulter} from "../data/attachmentMulter.js";

const router = express.Router();

/** POST**/
router.post('/:userId',verifyToken,attachmentsMulter,userStatus);
/**GET**/
router.get('/:userId',verifyToken,getUserStatus);
/**DELETE**/
router.delete('/:userId',verifyToken,deleteStatus);
/**GET**/
// router.get('/friendStatus/:userId',verifyToken,firendStatus)

export default router;