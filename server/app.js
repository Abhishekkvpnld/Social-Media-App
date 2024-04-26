import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import morgan from "morgan";
import multer from "multer";
import { fileURLToPath } from "url";
import { register } from "./controller/auth.js";
import { createPost } from "./controller/posts.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/post.js";
import statusRoute from "./routes/status.js";
import { verifyToken } from "./middlewares/verify.js";
import { v2 as cloudinary } from "cloudinary";
import User from "./models/user.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js"


/*CONFIGURATION */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use("/status", express.static(path.join(__dirname, 'public/status')))



/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage });


/* ROUTES */
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/status", statusRoute);

/* ROUTES WITH FILE */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.get("/", (req, res) => {
    res.send("server running")
});

/* MONGODB CONNECTION */
const PORT = process.env.PORT || 4000
const URL = process.env.MONGO_ATLAS_URL || "mongodb+srv://abhishekkvpnld:ZNTEimPqbyLfS7p3@cluster0.jzfez0b.mongodb.net"
mongoose.connect(URL, {
    // useNewUrlParse :true,
    // useUnifiedTopology : true 
}).then(() => {
    console.log('DB Connection successfull');
    app.listen(PORT, () => {
        console.log(`server connected on Port ${PORT}`)
    })

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((err) => {
    console.log(err.message)
});
