
import multer from "multer";

const multerUpload = multer({
    limits:{
        fileSize:1024*1024*5
    }
});

export const attachmentsMulter = multerUpload.array("files",1);
