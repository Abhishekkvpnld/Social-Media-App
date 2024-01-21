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
import {register} from "./controller/auth.js";
import authRoute from "./routes/auth.js";

/*CONFIGURATION */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))



/* FILE STORAGE */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage})

/* ROUTES WITH FILE */
app.post("/auth/register",upload.single('picture'),register)

/* ROUTES */
app.use("/auth",authRoute)



/* MONGODB CONNECTION */
const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGO_LOCAL_URL,{
// useNewUrlParse :true,
// useUnifiedTopology : true
}).then(()=>{
    console.log('DB Connection successfull')
}).catch((err)=>{
    console.log(err.message) 
})


app.listen(process.env.PORT,()=>{
    console.log(`server connected on Port ${PORT}`)
})