
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets") //the destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Specify the filename
    }
});

const upload = multer({ storage: storage });

export const attachmentsMulter = upload.single("files");
